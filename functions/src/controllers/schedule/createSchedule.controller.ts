import {HttpError} from '@errors/HttpError';
import {Database} from '@helpers/DatabaseController';
import {ISchedule} from '@helpers/DatabaseController/ScheduleController';
import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';
import * as admin from 'firebase-admin';
import * as nodeSchedule from 'node-schedule';
import * as moment from 'moment';
import {withRoles} from '@middlewares/role.middleware';
import {logger} from 'firebase-functions';

export type CreateScheduleBody = Omit<ISchedule, 'uid' | 'cratedAt'>;

const handleCreateSchedule: RequestHandler<unknown, DefaultResponse, CreateScheduleBody> = async (
	req,
	res,
	next
) => {
	try {
		const {
			date,
			groupId,
			lecturerId,
			lessonId,
			singleTime,
			time,
			weekDays,
			createdAt,
			description,
			isExam,
			link
		} = req.body;

		if (singleTime && !date)
			throw new HttpError('invalid-argument', 'Date need to be specified when single time is true');
		else if (!Array.isArray(weekDays))
			throw new HttpError(
				'invalid-argument',
				`weekDays expected type number[] , got ${typeof weekDays}`,
				{weekDays: {type: 'error', message: 'invalid data'}}
			);

		const ScheduleModel = new Database().schedule;

		const newSchedule = await ScheduleModel.create({
			date,
			groupId,
			lecturerId,
			lessonId,
			singleTime,
			time,
			weekDays,
			createdAt,
			description,
			isExam,
			link
		});

		const h = Number(time.split(':')[0]);
		const m = Number(time.split(':')[1]);

		const timer = moment().set({hour: h, minute: m}).subtract({minute: 2});
		nodeSchedule.scheduleJob(
			newSchedule.uid,
			singleTime
				? new Date(Number(date))
				: `${timer.get('minute')} ${timer.get('hour')} * * ${weekDays.join(',')}`,
			async () => {
				logger.log('executing job');
				if (singleTime) {
					nodeSchedule.cancelJob(newSchedule.uid);
				}
				const lessonController = new Database().lesson;
				const lecturerController = new Database().users;

				const lesson = await lessonController.findById(lessonId);

				const lecturer = await lecturerController.findById(lecturerId);

				await admin.messaging().sendToTopic(newSchedule.groupId, {
					notification: {
						title: `Your ${isExam ? 'exam' : 'lesson'} will start in 2 minutes`,
						body: `${lesson.title}\n${lesson.description || ''}\n${
							lecturer.displayName || lecturer.email
						}`
					},
					data: {
						linking: link || '',
						okText: link ? 'Open' : 'Ok'
					}
				});
				await admin.messaging().sendToTopic(newSchedule.lecturerId, {
					notification: {
						title: `Your ${isExam ? 'exam' : 'lesson'} will start in 2 minutes`,
						body: `${lesson.title}\n${lesson.description}\n${
							lecturer.displayName || lecturer.email
						}`
					},
					data: {
						linking: link || '',
						okText: link ? 'Open' : 'Ok'
					}
				});
			}
		);

		res.send({status: 'ok', message: 'Schedule success saved !'});
	} catch (error) {
		next(error);
	}
};

export const createSchedule = [withRoles('lecturer'), handleCreateSchedule];

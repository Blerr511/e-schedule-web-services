import * as admin from 'firebase-admin';
import {ISchedule, DefaultResponse, IScheduleIdentifier, ISchedulePayload} from '@types';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';

export type EditScheduleParams = IScheduleIdentifier;

export type EditScheduleResponse = DefaultResponse<ISchedule>;

export type EditScheduleBody = ISchedulePayload;

const handleEditSchedule: RequestHandler<EditScheduleParams, EditScheduleResponse, EditScheduleBody> = async (
	req,
	res,
	next
) => {
	try {
		const {facultyId, groupId, id} = req.params;

		const payload = req.body;

		const db = admin.database();

		const $schedule = db.ref(`faculty/${facultyId}/groups/${groupId}/schedules/${id}`);

		const schedule = await $schedule.get();

		if (!schedule.exists()) {
			throw new HttpError('not-found', 'Schedule not found');
		}

		await $schedule.update(payload);

		const newSchedule = (await $schedule.get()).toJSON() as ISchedule;

		res.send({status: 'ok', message: 'Schedule updated', data: newSchedule});
		next();
	} catch (error) {
		next(error);
	}
};

export const editSchedule = [handleEditSchedule];

import * as admin from 'firebase-admin';
import {ISchedule, DefaultResponse, IScheduleIdentifier} from '@types';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';

export type GetScheduleParams = Partial<IScheduleIdentifier>;

export type GetScheduleResponse = DefaultResponse<ISchedule[]>;

const handleGetSchedule: RequestHandler<GetScheduleParams, GetScheduleResponse> = async (req, res, next) => {
	try {
		const {facultyId, groupId, id} = req.params;

		const db = admin.database();

		const $group = db.ref(`faculty/${facultyId}/groups/${groupId}`);

		const group = await $group.get();

		if (!group.exists()) {
			throw new HttpError('not-found', 'Group not found');
		}

		const $schedules = $group.child('schedules');

		const data: ISchedule[] = [];

		const schedules = await $schedules.get();

		schedules.forEach(s => {
			data.push(s.toJSON() as ISchedule);
		});

		res.send({status: 'ok', message: 'Schedule removed', data});

		next();
	} catch (error) {
		next(error);
	}
};

export const getScheduleList = [handleGetSchedule];

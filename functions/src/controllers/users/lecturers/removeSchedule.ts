import * as admin from 'firebase-admin';
import {ISchedule, DefaultResponse, IScheduleIdentifier} from '@types';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';

export type RemoveScheduleParams = IScheduleIdentifier;

export type RemoveScheduleResponse = DefaultResponse<ISchedule>;

const handleRemoveSchedule: RequestHandler<RemoveScheduleParams, RemoveScheduleResponse> = async (
	req,
	res,
	next
) => {
	try {
		const {facultyId, groupId, id} = req.params;

		const db = admin.database();

		const $schedule = db.ref(`faculty/${facultyId}/groups/${groupId}/schedules/${id}`);

		const schedule = await $schedule.get();

		if (!schedule.exists()) {
			throw new HttpError('not-found', 'Schedule not found');
		}

		await $schedule.remove();

		res.send({status: 'ok', message: 'Schedule removed'});
		next();
	} catch (error) {
		next(error);
	}
};

export const removeSchedule = [handleRemoveSchedule];

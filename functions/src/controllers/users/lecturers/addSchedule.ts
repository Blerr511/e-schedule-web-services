import * as admin from 'firebase-admin';
import {ISchedule, DefaultResponse, IScheduleIdentifier, ISchedulePayload} from '@types';
import {RequestHandler} from 'express';
import * as uniqId from 'uniqid';
import {HttpError} from '@errors/HttpError';
export type AddScheduleParams = Pick<IScheduleIdentifier, 'facultyId' | 'groupId'>;

export type AddScheduleResponse = DefaultResponse<ISchedule>;

export type AddScheduleBody = ISchedulePayload;

const handleAddSchedule: RequestHandler<AddScheduleParams, AddScheduleResponse, AddScheduleBody> = async (
	req,
	res,
	next
) => {
	try {
		const {facultyId, groupId} = req.params;
		const {description, every, uri} = req.body;

		const db = admin.database();

		const $groups = db.ref(`faculty/${facultyId}/groups/${groupId}`);
		const group = await $groups.get();
		if (!group.exists()) {
			throw new HttpError('not-found', 'Group not found');
		}

		const $scheduleList = db.ref(`faculty/${facultyId}/groups/${groupId}/schedules`);

		const id = uniqId(`schedule`);

		const schedule: ISchedule = {
			description,
			every,
			facultyId,
			groupId,
			id,
			uri
		};

		await $scheduleList.update({[id]: schedule});

		res.send({status: 'ok', message: 'Schedule success created', data: schedule});
		next();
	} catch (error) {
		next(error);
	}
};

export const addSchedule = [handleAddSchedule];

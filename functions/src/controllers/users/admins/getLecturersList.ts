import * as admin from 'firebase-admin';
import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';
import {UserRecord} from 'firebase-functions/lib/providers/auth';
import {logger} from 'firebase-functions';

export type GetLecturerListResponse = DefaultResponse<UserRecord[]>;

const handleGetLecturersList: RequestHandler<never, GetLecturerListResponse> = async (req, res, next) => {
	try {
		const db = admin.database();
		const $lecturers = db.ref('lecturers');

		const lecturers = await $lecturers.get();

		logger.info(lecturers.toJSON());

		const ids: Array<{uid: string}> = [];

		lecturers.forEach(lect => {
			ids.push(lect.toJSON() as {uid: string});
		});

		const data: UserRecord[] = await Promise.all(ids.map(({uid}) => admin.auth().getUser(uid)));

		res.send({status: 'ok', message: 'Success', data});

		next();
	} catch (error) {
		next(error);
	}
};

export const getLecturersList = [handleGetLecturersList];

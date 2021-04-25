import * as admin from 'firebase-admin';
import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';
import {UserRecord} from 'firebase-functions/lib/providers/auth';
import {Database} from '@helpers/DatabaseController';

export type GetLecturerListResponse = DefaultResponse<UserRecord[]>;

const handleGetLecturersList: RequestHandler<never, GetLecturerListResponse> = async (req, res, next) => {
	try {
		const db = new Database();

		const lecturers = await db.users.find(user => user.role === 'lecturer');

		const data = await Promise.all(lecturers.map(el => admin.auth().getUser(el.uid)));

		res.send({status: 'ok', message: 'Success', data});

		next();
	} catch (error) {
		next(error);
	}
};

export const getLecturersList = [handleGetLecturersList];

import * as admin from 'firebase-admin';

import {RequestHandler} from 'express';
import {DefaultResponse, IFaculty} from '@types';

export type GetFacultiesResponse = DefaultResponse<IFaculty[]>;

const handleGetFaculties: RequestHandler<never, GetFacultiesResponse> = async (req, res, next) => {
	try {
		const db = admin.database();

		const $faculties = db.ref('faculties');

		const faculties = await $faculties.get();

		const data: IFaculty[] = [];

		faculties.forEach(f => {
			if (f) data.push(f.toJSON() as IFaculty);
		});

		res.send({status: 'ok', message: 'Success', data});
		next();
	} catch (error) {
		next(error);
	}
};

export const getFaculties = [handleGetFaculties];

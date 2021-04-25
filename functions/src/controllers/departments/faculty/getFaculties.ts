import {RequestHandler} from 'express';
import {DefaultResponse} from '@types';
import {Database} from '@helpers/DatabaseController';
import {IFaculty} from '@helpers/DatabaseController/faculty';

export type GetFacultiesResponse = DefaultResponse<IFaculty[]>;

const handleGetFaculties: RequestHandler<never, GetFacultiesResponse> = async (req, res, next) => {
	try {
		const db = new Database();

		const faculties = await db.faculty.find();

		res.send({status: 'ok', message: 'Success', data: faculties});
		next();
	} catch (error) {
		next(error);
	}
};

export const getFaculties = [handleGetFaculties];

import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {Database} from '@helpers/DatabaseController';

export type CreateStudentResponse = DefaultResponse;

export interface CreateStudentBody {
	uid: string;
}

const handleCreateStudent: RequestHandler<never, CreateStudentResponse, CreateStudentBody> = async (
	req,
	res,
	next
) => {
	try {
		const {uid} = req.body;

		const db = new Database();

		await db.users.create(uid, {uid, role: 'student'});

		res.send({status: 'ok', message: 'Student success created'});

		next();
	} catch (error) {
		next(error);
	}
};

export const createStudent = [
	body('uid').isString().withMessage('Uid is required'),
	validationResultMiddleware,
	handleCreateStudent
];

import * as admin from 'firebase-admin';
import {DefaultResponse} from '@types';
import {ROLES} from '@config/roles';
import {RequestHandler} from 'express';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {Database} from '@helpers/DatabaseController';

export type CreateLecturerResponse = DefaultResponse;

export interface CreateLecturerBody {
	email: string;
	name: string;
	surname: string;
}

const handleCreateLecturer: RequestHandler<never, CreateLecturerResponse, CreateLecturerBody> = async (
	req,
	res,
	next
) => {
	try {
		const {email, name, surname} = req.body;

		const {uid} = await admin.auth().createUser({email, displayName: `${name} ${surname}`});

		await admin.auth().setCustomUserClaims(uid, {role: ROLES.lecturer, name, surname});

		const data = await admin.auth().getUser(uid);

		const db = new Database();

		await db.users.create(uid, {uid, role: 'lecturer'});

		res.send({status: 'ok', message: 'Lecturer success created', data});

		next();
	} catch (error) {
		next(error);
	}
};

export const createLecturer = [
	body('email').isString().withMessage('Email is required').isEmail().withMessage('Invalid email format'),
	body('name').notEmpty().isString().withMessage('Name is required'),
	body('surname').notEmpty().isString().withMessage('Surname is required'),
	validationResultMiddleware,
	handleCreateLecturer
];

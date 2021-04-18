import * as admin from 'firebase-admin';
import {DefaultResponse} from '@types';
import {ROLES} from '@config/roles';
import {RequestHandler} from 'express';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';

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

		const {uid} = await admin
			.auth()
			.createUser({email, displayName: `${name} ${surname}`, emailVerified: true});

		await admin.auth().setCustomUserClaims(uid, {role: ROLES.lecturer});

		const data = await admin.auth().getUser(uid);

		const db = admin.database();
		const $lecturers = db.ref('lecturers');

		await $lecturers.push(uid);

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

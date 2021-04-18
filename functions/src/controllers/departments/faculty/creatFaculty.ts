import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';

import {RequestHandler} from 'express';
import {DefaultResponse, IFaculty, IFacultyPayload} from '@types';
import {withRoles} from '@middlewares/role.middleware';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';

export type CreateFacultiesResponse = DefaultResponse<IFaculty>;

export type CreateFacultyBody = IFacultyPayload;

const handleCreateFaculty: RequestHandler<never, CreateFacultiesResponse, CreateFacultyBody> = async (
	req,
	res,
	next
) => {
	try {
		const {name} = req.body;

		const db = admin.database();

		const $faculties = db.ref('faculties');

		const id = uniqid(`faculty-${name}-`);

		const faculty = {
			name,
			id
		};

		await $faculties.update({
			[id]: faculty
		});

		res.send({status: 'ok', message: 'Faculty success created', data: faculty});
	} catch (error) {
		next(error);
	}
};

export const createFaculty = [
	withRoles('admin'),
	body('name').isString().withMessage('Name is required'),
	validationResultMiddleware,
	handleCreateFaculty
];

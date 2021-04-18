import * as admin from 'firebase-admin';

import {RequestHandler} from 'express';
import {DefaultResponse, IFaculty, IFacultyIdentifier, IFacultyPayload, ParamsDictionary} from '@types';
import {withRoles} from '@middlewares/role.middleware';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';

export type EditFacultyParams = ParamsDictionary<IFacultyIdentifier>;

export type EditFacultiesResponse = DefaultResponse<IFaculty>;

export type EditFacultyBody = IFacultyPayload;

const handleEditFaculty: RequestHandler<EditFacultyParams, EditFacultiesResponse, EditFacultyBody> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;

		const {name} = req.body;

		const db = admin.database();

		const $faculties = db.ref('faculties');

		const faculty = {
			name
		};

		await $faculties.update({
			[id]: faculty
		});

		res.send({status: 'ok', message: 'Faculty success updated', data: {id, name}});
		next();
	} catch (error) {
		next(error);
	}
};

export const editFaculty = [
	withRoles('admin'),
	body('id').isString().withMessage('Id is required'),
	body('name').isString().withMessage('Faculty name is required'),
	validationResultMiddleware,
	handleEditFaculty
];

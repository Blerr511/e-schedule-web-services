import * as admin from 'firebase-admin';

import {RequestHandler} from 'express';
import {DefaultResponse, IFacultyIdentifier, ParamsDictionary} from '@types';
import {withRoles} from '@middlewares/role.middleware';
import {HttpError} from '@errors/HttpError';
import {param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';

export type RemoveFacultiesResponse = DefaultResponse<void>;

export type RemoveFacultyParams = ParamsDictionary<IFacultyIdentifier>;

const handleRemoveFaculty: RequestHandler<RemoveFacultyParams, RemoveFacultiesResponse> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;

		const db = admin.database();

		const $faculty = db.ref(`faculties/${id}`);

		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id ${id} , doesn't exists`);

		await $faculty.remove();

		res.send({status: 'ok', message: 'Faculty success updated'});
	} catch (error) {
		next(error);
	}
};

export const removeFaculty = [
	withRoles('admin'),
	param('id').isString().withMessage('Id is required'),
	validationResultMiddleware,
	handleRemoveFaculty
];

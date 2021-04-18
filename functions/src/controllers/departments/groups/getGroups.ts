import * as admin from 'firebase-admin';

import {DefaultResponse, IFacultyIdentifier, IGroup, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';

export type GetGroupResponse = DefaultResponse<IGroup[]>;

export type GetGroupParams = ParamsDictionary<IFacultyIdentifier>;

const handleGetGroups: RequestHandler<GetGroupParams, GetGroupResponse> = async (req, res, next) => {
	try {
		const {id} = req.params;

		const db = admin.database();

		const $groups = db.ref(`faculties/${id}/groups`);

		const groups = await $groups.get();

		const data: IGroup[] = [];

		groups.forEach(g => {
			data.push(g.toJSON() as IGroup);
		});

		res.send({status: 'ok', message: 'Success', data});
		next();
	} catch (error) {
		next(error);
	}
};

export const getGroups = [
	param('id').isString().withMessage('Faculty id not specified'),
	validationResultMiddleware,
	handleGetGroups
];

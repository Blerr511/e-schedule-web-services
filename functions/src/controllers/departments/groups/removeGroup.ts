import * as admin from 'firebase-admin';

import {DefaultResponse, IFacultyIdentifier, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';
import {param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';

export type RemoveGroupResponse = DefaultResponse;

export type RemoveGroupParams = ParamsDictionary<IFacultyIdentifier & {groupId: string}>;

const handleRemoveGroup: RequestHandler<RemoveGroupParams, RemoveGroupResponse> = async (req, res, next) => {
	try {
		const {id, groupId} = req.params;

		const db = admin.database();

		const $group = db.ref(`faculties/${id}/groups/${groupId}`);

		const groups = await $group.get();

		if (!groups.exists()) throw new HttpError('not-found', `Group with id ${id} doesn't found`);

		await $group.remove();

		res.send({status: 'ok', message: 'Group success removed'});

		next();
	} catch (error) {
		next(error);
	}
};

export const removeGroup = [
	param('id').isString().withMessage('Faculty id not specified'),
	param('groupId').isString().withMessage('Group id not specified'),
	validationResultMiddleware,
	handleRemoveGroup
];

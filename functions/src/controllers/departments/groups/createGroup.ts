import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';

import {DefaultResponse, IFacultyIdentifier, IGroup, IGroupPayload, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';
import {body, param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {withRoles} from '@middlewares/role.middleware';

export type CreateGroupBody = IGroupPayload;

export type CreateGroupResponse = DefaultResponse<IGroup>;

export type CreateGroupParams = ParamsDictionary<IFacultyIdentifier>;

const handleCreateGroup: RequestHandler<CreateGroupParams, CreateGroupResponse, CreateGroupBody> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;
		const {name} = req.body;

		const db = admin.database();

		const $faculty = db.ref(`faculties/${id}`);

		const faculty = await $faculty.get();

		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id ${id} doesn't found`);

		const groups = $faculty.child('groups');

		const groupId = uniqid(`faculty(${id})-group(${name})`);

		const group = {
			id: groupId,
			name
		};

		groups.update({[id]: group});

		res.send({status: 'ok', message: 'Group success created', data: group});
		next();
	} catch (error) {
		next(error);
	}
};

export const createGroup = [
	withRoles('admin'),
	body('name').isString().withMessage('Group name is required'),
	param('id').isString().withMessage('Faculty id not specified'),
	validationResultMiddleware,
	handleCreateGroup
];

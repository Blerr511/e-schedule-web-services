import * as admin from 'firebase-admin';

import {DefaultResponse, IFacultyIdentifier, IGroup, IGroupPayload, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';
import {body, param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {withRoles} from '@middlewares/role.middleware';

export type EditGroupBody = IGroupPayload;

export type EditGroupResponse = DefaultResponse<IGroup>;

export type EditGroupParams = ParamsDictionary<IFacultyIdentifier & {groupId: string}>;

const handleEditGroup: RequestHandler<EditGroupParams, EditGroupResponse, EditGroupBody> = async (
	req,
	res,
	next
) => {
	try {
		const {id, groupId} = req.params;
		const {name} = req.body;

		const db = admin.database();

		const $groups = db.ref(`faculties/${id}/groups/${groupId}`);

		const groups = await $groups.get();

		if (!groups.exists()) throw new HttpError('not-found', `Group with id ${id} doesn't found`);

		const group = {
			name
		};

		$groups.update({[id]: group});

		res.send({status: 'ok', message: 'Group success created', data: {name, id: groupId}});
		next();
	} catch (error) {
		next(error);
	}
};

export const editGroup = [
	withRoles('admin'),
	body('name').isString().withMessage('Group name is required'),
	param('id').isString().withMessage('Faculty id not specified'),
	param('groupId').isString().withMessage('Group id not specified'),
	validationResultMiddleware,
	handleEditGroup
];

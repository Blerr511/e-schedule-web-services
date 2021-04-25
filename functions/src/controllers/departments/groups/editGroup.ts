import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {body, param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {withRoles} from '@middlewares/role.middleware';
import {IGroup, IGroupPayload} from '@helpers/DatabaseController/groups';
import {Database} from '@helpers/DatabaseController';

export type EditGroupBody = IGroupPayload;

export type EditGroupResponse = DefaultResponse<IGroup>;

export type EditGroupParams = ParamsDictionary<{groupId: string}>;

const handleEditGroup: RequestHandler<EditGroupParams, EditGroupResponse, EditGroupBody> = async (
	req,
	res,
	next
) => {
	try {
		const {groupId} = req.params;
		const {name} = req.body;

		const db = new Database();

		const group = await db.groups.updateById(groupId, {name});

		res.send({status: 'ok', message: 'Group success created', data: group});
		next();
	} catch (error) {
		next(error);
	}
};

export const editGroup = [
	withRoles('admin'),
	body('name').isString().withMessage('Group name is required'),
	param('groupId').isString().withMessage('Group id not specified'),
	validationResultMiddleware,
	handleEditGroup
];

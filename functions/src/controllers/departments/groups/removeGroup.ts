import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {IGroupIdentifier} from '@helpers/DatabaseController/groups';
import {Database} from '@helpers/DatabaseController';

export type RemoveGroupResponse = DefaultResponse;

export type RemoveGroupParams = ParamsDictionary<IGroupIdentifier>;

const handleRemoveGroup: RequestHandler<RemoveGroupParams, RemoveGroupResponse> = async (req, res, next) => {
	try {
		const {id} = req.params;

		const db = new Database();

		await db.groups.removeById(id);

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

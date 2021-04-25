import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {withRoles} from '@middlewares/role.middleware';
import {Database} from '@helpers/DatabaseController';
import {IGroup, IGroupPayload} from '@helpers/DatabaseController/groups';

export type CreateGroupBody = IGroupPayload;

export type CreateGroupResponse = DefaultResponse<IGroup>;

const handleCreateGroup: RequestHandler<unknown, CreateGroupResponse, CreateGroupBody> = async (
	req,
	res,
	next
) => {
	try {
		const {name, facultyId} = req.body;

		const db = new Database();

		await db.faculty.findById(facultyId);

		const group = await db.groups.create({facultyId, name});

		res.send({status: 'ok', message: 'Group success created', data: group});
		next();
	} catch (error) {
		next(error);
	}
};

export const createGroup = [
	withRoles('admin'),
	body('name').isString().withMessage('Group name is required'),
	body('facultyId').isString().withMessage('Faculty id not specified'),
	validationResultMiddleware,
	handleCreateGroup
];

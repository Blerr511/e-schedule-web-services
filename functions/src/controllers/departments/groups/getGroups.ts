import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {IGroup, IGroupIdentifier} from '@helpers/DatabaseController/groups';
import {Database} from '@helpers/DatabaseController';

export type GetGroupResponse = DefaultResponse<IGroup | IGroup[]>;

export type GetGroupQuery = {facultyId?: string};

export type GetGroupParams = ParamsDictionary<Partial<IGroupIdentifier>>;

const handleGetGroups: RequestHandler<GetGroupParams, GetGroupResponse, void, GetGroupQuery> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;
		const {facultyId} = req.query;
		const db = new Database();
		const groups = id
			? await db.groups.findById(id)
			: await db.groups.find(g => !facultyId || g.facultyId === facultyId);

		res.send({status: 'ok', message: 'Success', data: groups});
		next();
	} catch (error) {
		next(error);
	}
};

export const getGroups = [handleGetGroups];

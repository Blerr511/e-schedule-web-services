import {RequestHandler} from 'express';
import {DefaultResponse, ParamsDictionary} from '@types';
import {withRoles} from '@middlewares/role.middleware';
import {param} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {Database} from '@helpers/DatabaseController';
import {IFacultyIdentifier} from '@helpers/DatabaseController/faculty';

export type RemoveFacultiesResponse = DefaultResponse<void>;

export type RemoveFacultyParams = ParamsDictionary<IFacultyIdentifier>;

const handleRemoveFaculty: RequestHandler<RemoveFacultyParams, RemoveFacultiesResponse> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;

		const db = new Database();

		await db.faculty.removeById(id);

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

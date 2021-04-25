import {RequestHandler} from 'express';
import {DefaultResponse, ParamsDictionary} from '@types';
import {withRoles} from '@middlewares/role.middleware';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {Database} from '@helpers/DatabaseController';
import {IFaculty, IFacultyIdentifier, IFacultyPayload} from '@helpers/DatabaseController/faculty';

export type EditFacultyParams = ParamsDictionary<IFacultyIdentifier>;

export type EditFacultiesResponse = DefaultResponse<IFaculty>;

export type EditFacultyBody = IFacultyPayload;

const handleEditFaculty: RequestHandler<EditFacultyParams, EditFacultiesResponse, EditFacultyBody> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;

		const {name} = req.body;

		const db = new Database();

		const data = await db.faculty.updateById(id, {name});

		res.send({status: 'ok', message: 'Faculty success updated', data});
		next();
	} catch (error) {
		next(error);
	}
};

export const editFaculty = [
	withRoles('admin'),
	body('id').isString().withMessage('Id is required'),
	body('name').isString().withMessage('Faculty name is required'),
	validationResultMiddleware,
	handleEditFaculty
];

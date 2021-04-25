import {RequestHandler} from 'express';
import {DefaultResponse} from '@types';
import {withRoles} from '@middlewares/role.middleware';
import {body} from 'express-validator';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {Database} from '@helpers/DatabaseController';
import {IFaculty, IFacultyPayload} from '@helpers/DatabaseController/faculty';

export type CreateFacultiesResponse = DefaultResponse<IFaculty>;

export type CreateFacultyBody = IFacultyPayload;

const handleCreateFaculty: RequestHandler<never, CreateFacultiesResponse, CreateFacultyBody> = async (
	req,
	res,
	next
) => {
	try {
		const {name} = req.body;

		const db = new Database();

		const faculty = await db.faculty.create({name});

		res.send({status: 'ok', message: 'Faculty success created', data: faculty});
	} catch (error) {
		next(error);
	}
};

export const createFaculty = [
	withRoles('admin'),
	body('name').isString().withMessage('Name is required'),
	validationResultMiddleware,
	handleCreateFaculty
];

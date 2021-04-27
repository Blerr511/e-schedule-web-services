import {Database} from '@helpers/DatabaseController';
import {ILesson, ILessonPayload} from '@helpers/DatabaseController/lesson';
import {withRoles} from '@middlewares/role.middleware';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';
import {body} from 'express-validator';

export type CreateLessonBody = ILessonPayload;

export type CreateLessonResponse = DefaultResponse<ILesson>;

const handleCreateLesson: RequestHandler<unknown, CreateLessonResponse, CreateLessonBody> = async (
	req,
	res,
	next
) => {
	try {
		const {facultyId, name} = req.body;
		const db = new Database();

		await db.faculty.findById(facultyId);

		const lesson = await db.lesson.create({facultyId, name});

		res.send({status: 'ok', message: 'Lesson success created', data: lesson});
		next();
	} catch (error) {
		next(error);
	}
};

export const createLesson = [
	withRoles('admin'),
	body('facultyId').isString().withMessage('Faculty  id is required'),
	body('name').isString().withMessage('Lesson name is required'),
	validationResultMiddleware,
	handleCreateLesson
];

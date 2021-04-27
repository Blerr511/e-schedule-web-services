import {Database} from '@helpers/DatabaseController';
import {ILesson, ILessonIdentifier, ILessonPayload} from '@helpers/DatabaseController/lesson';
import {withRoles} from '@middlewares/role.middleware';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {body, oneOf} from 'express-validator';

export type EditLessonParams = ParamsDictionary<ILessonIdentifier>;

export type EditLessonBody = ILessonPayload;

export type EditLessonRes = DefaultResponse<ILesson>;

const handleEditLesson: RequestHandler<EditLessonParams, EditLessonRes, EditLessonBody> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;
		const {facultyId, name} = req.body;
		const db = new Database();
		const data = await db.lesson.updateById(id, {facultyId, name});

		res.send({status: 'ok', message: 'Lesson success updated', data});

		next();
	} catch (error) {
		next(error);
	}
};

export const editLesson = [
	withRoles('admin'),
	oneOf([body('faculty').isString(), body('name').isString(), body('lecturerId').isString()]),
	validationResultMiddleware,
	handleEditLesson
];

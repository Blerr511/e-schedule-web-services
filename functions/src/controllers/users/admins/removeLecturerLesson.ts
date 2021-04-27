import {DBRelations} from '@helpers/DBRelations/DBRelations';
import {withRoles} from '@middlewares/role.middleware';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {body, param} from 'express-validator';

export type RemoveLecturerLessonResponse = DefaultResponse;

export type RemoveLecturerLessonBody = {
	lesson: string;
};

export type RemoveLecturerLessonParams = ParamsDictionary<{id: string}>;

const handleRemoveLecturerLesson: RequestHandler<
	RemoveLecturerLessonParams,
	RemoveLecturerLessonResponse,
	RemoveLecturerLessonBody
> = async (req, res, next) => {
	try {
		const {lesson} = req.body;
		const {id} = req.params;

		await new DBRelations().lecturerLessons.update(id, [lesson]);
	} catch (error) {
		next(error);
	}
};

export const removeLecturerLesson = [
	withRoles('admin'),
	body('lessons').notEmpty().isArray(),
	body('lessons.*').isString(),
	param('id').isString(),
	validationResultMiddleware,
	handleRemoveLecturerLesson
];

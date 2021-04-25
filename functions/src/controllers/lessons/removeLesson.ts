import {Database} from '@helpers/DatabaseController';
import {ILessonIdentifier} from '@helpers/DatabaseController/lesson';
import {withRoles} from '@middlewares/role.middleware';
import {validationResultMiddleware} from '@middlewares/validationResult.middleware';
import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';
import {param} from 'express-validator';

export type RemoveLessonParams = ParamsDictionary<ILessonIdentifier>;
export type RemoveLessonResponse = DefaultResponse;

const handleRemoveLesson: RequestHandler<RemoveLessonParams, RemoveLessonResponse> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;
		const db = new Database();
		await db.lesson.removeById(id);
		res.send({status: 'ok', message: 'Lesson success removed'});
		next();
	} catch (error) {
		next(error);
	}
};

export const removeLesson = [
	withRoles('admin'),
	param('id').isString().withMessage('Id is required'),
	validationResultMiddleware,
	handleRemoveLesson
];

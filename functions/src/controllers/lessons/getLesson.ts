import {Database} from '@helpers/DatabaseController';
import {ILesson, ILessonIdentifier} from '@helpers/DatabaseController/lesson';
import {DefaultResponse, ParamsDictionary} from '@types';
import {RequestHandler} from 'express';

export type GetLessonParams = ParamsDictionary<Partial<ILessonIdentifier>>;

export type GetLessonResponse = DefaultResponse<ILesson | ILesson[]>;

export type GetLessonQuery = {
	facultyId?: string;
	lecturerId?: string;
};

const handleGetLesson: RequestHandler<GetLessonParams, GetLessonResponse, void, GetLessonQuery> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;
		const {facultyId, lecturerId} = req.query;
		const db = new Database();

		const data = id
			? await db.lesson.findById(id)
			: await db.lesson.find(
					l =>
						(!facultyId || l.facultyId === facultyId) &&
						(!lecturerId || l.lecturerId === lecturerId)
			  );

		res.send({status: 'ok', message: 'ok', data});
	} catch (error) {
		next(error);
	}
};

export const getLesson = [handleGetLesson];

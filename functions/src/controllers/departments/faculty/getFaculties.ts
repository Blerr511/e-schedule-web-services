import {RequestHandler} from 'express';
import {DefaultResponse, ParamsDictionary} from '@types';
import {Database} from '@helpers/DatabaseController';
import {IFaculty, IFacultyIdentifier} from '@helpers/DatabaseController/faculty';

export type GetFacultiesParams = ParamsDictionary<Partial<IFacultyIdentifier>>;

export type GetFacultiesResponse = DefaultResponse<IFaculty | IFaculty[]>;

const handleGetFaculties: RequestHandler<GetFacultiesParams, GetFacultiesResponse> = async (
	req,
	res,
	next
) => {
	try {
		const {id} = req.params;

		const db = new Database();

		const faculties = id ? await db.faculty.findById(id) : await db.faculty.find();

		res.send({status: 'ok', message: 'Success', data: faculties});
		next();
	} catch (error) {
		next(error);
	}
};

export const getFaculties = [handleGetFaculties];

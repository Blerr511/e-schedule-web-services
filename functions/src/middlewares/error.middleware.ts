import {HttpError} from '@errors/HttpError';
import {DefaultResponse} from '@typeDefs/api.types';
import {ErrorRequestHandler, NextFunction, Request, Response} from 'express';

const errorMiddleware: ErrorRequestHandler<never, DefaultResponse> = (
	error: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const status: number = error.code || 500;
		const message: string = error.message || 'Something went wrong';
		const meta = error.meta;

		const response: DefaultResponse = {
			status: 'error',
			meta,
			message
		};

		res.status(status).send(response);
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;

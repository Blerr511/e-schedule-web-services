import {HttpError} from '@errors/HttpError';
import {ErrorResponse} from '@types';
import {ErrorRequestHandler, NextFunction, Request, Response} from 'express';

const errorMiddleware: ErrorRequestHandler<never, ErrorResponse> = (
	error: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const status: number = error.httpErrorCode?.status || 400;
		const message: string = error.message || 'Something went wrong';

		const response: ErrorResponse = {
			status: 'error',
			message,
			meta: error.meta,
			code: error.code
		};

		res.status(status).send(response);
	} catch (error) {
		next(error);
	}
};

export default errorMiddleware;

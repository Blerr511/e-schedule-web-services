import {HttpError} from '@errors/HttpError';
import {Meta} from '@types';
import {RequestHandler} from 'express';
import {validationResult} from 'express-validator';

export const validationResultMiddleware: RequestHandler = (req, res, next) => {
	const result = validationResult.withDefaults({
		formatter: err => {
			return {
				type: 'error',
				message: err.msg
			};
		}
	})(req);

	if (result.isEmpty()) next();
	else
		next(
			new HttpError(
				'invalid-argument',
				result.array({onlyFirstError: true})[0].message,
				result.mapped() as Meta
			)
		);
};

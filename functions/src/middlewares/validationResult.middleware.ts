import {HttpError} from '@errors/HttpError';
import {MetaItem} from '@types';
import {RequestHandler} from 'express';
import {validationResult} from 'express-validator';

export const validationResultMiddleware: RequestHandler = (req, res, next) => {
	const result = validationResult.withDefaults({
		formatter: (err): MetaItem => {
			return {
				type: 'error',
				message: err.msg
			};
		}
	})(req);

	if (result.isEmpty()) next();
	else next(new HttpError(result.array({onlyFirstError: true})[0].message, 400, result.mapped()));
};

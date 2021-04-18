// import {HttpError} from '@errors/HttpError';
import {RequestHandler} from 'express';
import {validationResult} from 'express-validator';
import {logger} from 'firebase-functions';

export const validationResultMiddleware: RequestHandler = (req, res, next) => {
	const result = validationResult.withDefaults({
		formatter: err => {
			return {
				type: 'error',
				message: err.msg
			};
		}
	})(req);
	logger.log('valRest', result);
	logger.log('mapped', result.mapped());
	logger.log('array', result.array());
	if (result.isEmpty()) next();
	// else next(new HttpError(result.array({onlyFirstError: true})[0].message, 400, result.mapped()));
};

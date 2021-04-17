import {Role} from '@config/roles';
import {HttpError} from '@errors/HttpError';
import {RequestHandler} from 'express';

export const withRoles = (...roles: Array<Role>): RequestHandler => {
	const roleMiddleware: RequestHandler = async (req, res, next) => {
		const role = req.user?.customClaims?.role;
		if (!role || !roles.includes(role)) next(new HttpError(`Access for role "${role}" denied.`, 403));
		else next();
	};
	return roleMiddleware;
};

import * as admin from 'firebase-admin';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';
import {ROLES} from '@config/roles';

const authMiddleware: RequestHandler = async (req, res, next) => {
	try {
		if (!req.headers.authorization || !req.headers.authorization.split('Bearer ')[1]) {
			throw new HttpError('unauthenticated', 'Auth token is missing');
		}
		const token = req.headers.authorization.split('Bearer ')[1];

		const result = await admin.auth().verifyIdToken(token);

		const user = await admin.auth().getUser(result.uid);

		if (!user.customClaims?.role) admin.auth().setCustomUserClaims(user.uid, {role: ROLES.student});

		req.user = user;

		next();
	} catch (error) {
		next(error);
	}
};

export default authMiddleware;

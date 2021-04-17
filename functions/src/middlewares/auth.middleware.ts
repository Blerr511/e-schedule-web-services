import * as admin from 'firebase-admin';
import {HttpError} from '@errors';
import {RequestHandler} from 'express';

const authMiddleware: RequestHandler = async (req, res, next) => {
	try {
		if (!req.headers.authorization || !req.headers.authorization.split('Bearer ')[1]) {
			throw new HttpError('Auth token is missing', 401);
		}
		const token = req.headers.authorization.split('Bearer ')[1];

		const result = await admin.auth().verifyIdToken(token);

		const user = await admin.auth().getUser(result.uid);

		req.user = user;
	} catch (error) {
		next(error);
	}
};

export default authMiddleware;

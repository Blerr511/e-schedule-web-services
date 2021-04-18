import * as admin from 'firebase-admin';
import {RequestHandler} from 'express';
import {HttpError} from '@errors/HttpError';

const authMiddleware: RequestHandler = async (req, res, next) => {
	try {
		if (!req.headers.authorization || !req.headers.authorization.split('Bearer ')[1]) {
			throw new HttpError('unauthenticated', 'Auth token is missing');
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

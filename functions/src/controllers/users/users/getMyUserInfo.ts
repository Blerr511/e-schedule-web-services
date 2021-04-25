import {HttpError} from '@errors/HttpError';
import {Database} from '@helpers/DatabaseController';
import {IUser} from '@helpers/DatabaseController/users/types';
import {DefaultResponse} from '@types';
import {RequestHandler} from 'express';

export type MyUserInfoResponse = DefaultResponse<IUser>;

const handleGetMyUserInfo: RequestHandler<never, MyUserInfoResponse> = async (req, res, next) => {
	try {
		if (!req.user) throw new HttpError('unauthenticated', 'User not found');
		const db = new Database();
		const user = await db.users.findById(req.user.uid);

		res.send({
			status: 'ok',
			message: 'ok',
			data: user
		});
	} catch (error) {
		next(error);
	}
};

export const getMyUser = [handleGetMyUserInfo];

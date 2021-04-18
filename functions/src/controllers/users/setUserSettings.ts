import {HttpError} from '@errors/HttpError';
import {DefaultResponse, UserSettings} from '@types';
import {RequestHandler} from 'express';
import {body} from 'express-validator';
import * as admin from 'firebase-admin';

export interface SetUserSettingsBody {
	userId: string;
	settings: UserSettings;
}

export type UserUserSettingsResponse = DefaultResponse;

const handleSetUserSettings: RequestHandler<never, UserUserSettingsResponse, SetUserSettingsBody> = async (
	req,
	res,
	next
) => {
	try {
		const {settings, userId} = req.body;
		const db = admin.database();

		const $user = db.ref(`users/${userId}`);
		const user = await $user.get();
		if (!user.exists())
			throw new HttpError(`User ${userId} doesn't exists`, 404, {
				userId: {type: 'error', message: 'not found'}
			});

		const $settings = $user.child('settings');

		await $settings.update(settings);

		res.send({status: 'ok', message: 'Settings success updated'});

		next();
	} catch (error) {
		next(error);
	}
};

export const setUserSettings = [body('userId').isString(), handleSetUserSettings];

import {HttpError} from '@errors/HttpError';
import {DefaultResponse, StudentSettings} from '@types';
import {RequestHandler} from 'express';
import * as admin from 'firebase-admin';

export type SetStudentSettingsBody = StudentSettings;

export type SetStudentSettingsResponse = DefaultResponse;

const handleSetStudentSettings: RequestHandler<
	never,
	SetStudentSettingsResponse,
	SetStudentSettingsBody
> = async (req, res, next) => {
	try {
		const settings = req.body;
		const userId = req.user?.uid;

		const db = admin.database();

		const $settings = db.ref(`users/${userId}/settings`);

		await $settings.update(settings);

		res.send({status: 'ok', message: 'Settings success updated'});

		next();
	} catch (error) {
		next(error);
	}
};

export const setStudentSettings = [handleSetStudentSettings];

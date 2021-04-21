import {HttpError} from '@errors/HttpError';
import {DefaultResponse, StudentSettings} from '@types';
import {RequestHandler} from 'express';
import * as admin from 'firebase-admin';

export type GetStudentSettingsResponse = DefaultResponse<StudentSettings>;

const handleGetStudentSettings: RequestHandler<never, GetStudentSettingsResponse> = async (
	req,
	res,
	next
) => {
	try {
		const userId = req.user?.uid;
		if (!userId) throw new HttpError('invalid-argument', 'UserId not provided');

		const db = admin.database();

		const $settings = db.ref(`students/${userId}/settings`);

		const settings = await $settings.get();

		const defaultSettings: StudentSettings = {
			group: null
		};

		if (!settings.exists()) $settings.set(defaultSettings);

		res.send({
			status: 'ok',
			message: 'Success',
			data: (settings.toJSON() as StudentSettings) || defaultSettings
		});

		next();
	} catch (error) {
		next(error);
	}
};

export const getStudentSettings = [handleGetStudentSettings];

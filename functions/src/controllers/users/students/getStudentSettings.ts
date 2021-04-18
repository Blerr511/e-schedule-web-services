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

		const db = admin.database();

		const $settings = db.ref(`users/${userId}/settings`);

		const settings = await $settings.get();

		res.send({
			status: 'ok',
			message: 'Settings success updated',
			data: settings.toJSON() as StudentSettings
		});

		next();
	} catch (error) {
		next(error);
	}
};

export const getStudentSettings = [handleGetStudentSettings];

import {config} from 'dotenv';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {app} from './services';

config();

const init = async (): Promise<void> => {
	admin.initializeApp({
		databaseURL: process.env.DB_URL,
		projectId: 'eshedule'
	});
};

init();

export const api = functions.https.onRequest(app);

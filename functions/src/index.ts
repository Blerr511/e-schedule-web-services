import {config} from 'dotenv';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {app} from './services';
import * as cert from './eshedule-firebase-adminsdk-zfd3y-671e3ac3d7.json';

config();

const init = async (): Promise<void> => {
	admin.initializeApp({
		databaseURL: process.env.DB_URL,
		projectId: 'eshedule',
		credential: admin.credential.cert({
			clientEmail: cert.client_email,
			privateKey: cert.private_key,
			projectId: cert.project_id
		})
	});
};

init();

export const api = functions.https.onRequest(app);

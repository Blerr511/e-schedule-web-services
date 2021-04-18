import {config} from 'dotenv';
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {app} from './services';

config();
functions.logger.log('dbdddddddddddd', process.env.DB_URL, {hellow: 'world'});

admin.initializeApp({
	databaseURL: process.env.DB_URL,
	projectId: 'eshedule'
});

export const api = functions.https.onRequest(app);

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

import {auth} from 'firebase-admin/lib';

declare global {
	namespace Express {
		interface Request {
			user?: auth.UserRecord;
		}
	}
}

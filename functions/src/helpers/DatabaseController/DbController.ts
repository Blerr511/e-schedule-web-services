import * as admin from 'firebase-admin';
import {Users} from './users/Users.controller';

export class Database {
	private db = admin.database();
	public get users(): Users {
		return new Users(this.db);
	}
}

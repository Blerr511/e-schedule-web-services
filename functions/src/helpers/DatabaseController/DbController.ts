import * as admin from 'firebase-admin';
import {Users} from './users';
import {Groups} from './groups';
import {Faculty} from './faculty';

export class Database {
	private db = admin.database();
	public get users(): Users {
		return new Users(this.db);
	}
	public get groups(): Groups {
		return new Groups(this.db);
	}
	public get faculty(): Faculty {
		return new Faculty(this.db);
	}
}

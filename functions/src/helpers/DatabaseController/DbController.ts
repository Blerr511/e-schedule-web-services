import * as admin from 'firebase-admin';
import {Users} from './users';
import {Groups} from './groups';
import {Faculty} from './faculty';
import {Lesson} from './lesson';

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
	public get lesson(): Lesson {
		return new Lesson(this.db);
	}
}

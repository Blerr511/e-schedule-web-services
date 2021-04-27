/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {Database} from '@helpers/DatabaseController';
import {Relation} from '@helpers/DbRelation';

export class DBRelations {
	private db = new Database();

	public get lecturerLessons() {
		return new Relation(this.db.users, this.db.lesson);
	}
}

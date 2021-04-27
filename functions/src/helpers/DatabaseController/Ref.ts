import * as admin from 'firebase-admin';

export abstract class Ref {
	public abstract _ref: string;
	protected abstract db: admin.database.Database;
	protected getRef(...nested: string[]): admin.database.Reference {
		const refStr = nested.reduce((acc, v) => `${acc}/${v}`, this._ref);
		const ref = this.db.ref(refStr);
		return ref;
	}
}

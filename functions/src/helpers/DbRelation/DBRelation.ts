import * as admin from 'firebase-admin';
import {HttpError} from '@errors/HttpError';
import {DatabaseController, IDBElement} from '@helpers/DatabaseController';

export class Relation<M extends IDBElement = IDBElement, R extends IDBElement = IDBElement> {
	private db = admin.database();
	mainClass: DatabaseController<M, M>;
	relationClass: DatabaseController<R, R>;
	_ref: string;
	constructor(mainClass: DatabaseController<M, M>, relationClass: DatabaseController<R, R>) {
		this.mainClass = mainClass;
		this.relationClass = relationClass;
		this._ref = `${mainClass._ref}->${relationClass._ref}`;
	}
	private getRef(...nested: string[]) {
		const refStr = nested.reduce((acc, v) => `${acc}/${v}`, this._ref);
		const ref = this.db.ref(refStr);
		return ref;
	}
	public async create(uid: string, uids: string[]): Promise<unknown> {
		const $ref = this.getRef(uid);
		return await $ref.set(uids);
	}
	public async update(uid: string, uids: string[]): Promise<unknown> {
		const $ref = this.getRef(uid);
		const ref = await $ref.get();
		if (!ref.exists())
			throw new HttpError('not-found', `Ref wih id ${uid} not found.`, {
				ref: {type: 'error', message: this._ref}
			});
		return await $ref.update(uids);
	}

	public async get(uid: string): Promise<R[]> {
		const $ref = this.getRef(uid);
		const ref = await $ref.get();
		if (!ref.exists())
			throw new HttpError('not-found', `Ref wih id ${uid} not found.`, {
				ref: {type: 'error', message: this._ref}
			});

		const data: Promise<R>[] = [];

		ref.forEach(id => {
			const d = id.toJSON() as string;

			data.push(this.relationClass.findById(d));
		});

		return Promise.all(data);
	}
}

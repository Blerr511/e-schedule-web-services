import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';
import {DatabaseController} from '../types';
import {HttpError} from '@errors/HttpError';
import {IGroup, IGroupPayload} from './types';
import {Ref} from '../Ref';

export class Groups extends Ref implements DatabaseController<IGroupPayload, IGroup> {
	protected db: admin.database.Database;

	_ref = 'groups';

	constructor(db: admin.database.Database) {
		super();
		this.db = db;
	}

	public async create(group: IGroupPayload): Promise<IGroup> {
		const uid = uniqid(`group-`);

		const $group = this.getRef(uid);

		const g = await $group.get();
		if (g.exists()) throw new HttpError('already-exists', `Group with id ${uid} already exits`);

		const data: IGroup = {...group, uid};

		await $group.set(data);

		return data;
	}

	public async updateById(uid: string, group: Partial<IGroupPayload>): Promise<IGroup> {
		const $group = this.getRef(uid);
		const g = await $group.get();
		if (!g.exists()) throw new HttpError('not-found', `Group with id ${uid} doesn't exists`);

		await $group.update(group);
		const newGroup = await $group.get();
		return newGroup.toJSON() as IGroup;
	}

	public async findById(uid: string): Promise<IGroup> {
		const $group = this.getRef(uid);
		const g = await $group.get();
		if (!g.exists()) throw new HttpError('not-found', `Group with id ${uid} doesn't exists`);
		const data = g.toJSON() as IGroup;
		return data;
	}

	public async find(resolver?: (data: IGroup) => boolean): Promise<IGroup[]> {
		const $groups = this.getRef();
		const groups = await $groups.get();

		const res: IGroup[] = [];
		groups.forEach(g => {
			const data = g.toJSON() as IGroup;
			if (!resolver || resolver(data)) res.push(data);
		});

		return res;
	}

	public async removeById(uid: string): Promise<void> {
		const $group = this.getRef(uid);
		const g = await $group.get();
		if (!g.exists()) throw new HttpError('not-found', `Group with id ${uid} doesn't exists`);
		await $group.remove();
	}
}

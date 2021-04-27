import {HttpError} from '@errors/HttpError';
import * as admin from 'firebase-admin';
import {Ref} from '../Ref';
import {DatabaseController} from '../types';
import {IUser} from './types';

export class Users extends Ref implements DatabaseController<IUser> {
	_ref = 'users';

	protected db: admin.database.Database;

	constructor(db: admin.database.Database) {
		super();
		this.db = db;
	}

	public async create(user: IUser): Promise<IUser> {
		const uid = user.uid;
		const $users = this.getRef(uid);
		if ((await $users.get()).exists())
			throw new HttpError('already-exists', `User with id ${uid} already exists`);
		await $users.set(user);
		const users = await $users.get();
		return users.toJSON() as IUser;
	}

	public async updateById(uid: string, user: Partial<IUser>): Promise<unknown> {
		const $users = this.getRef(uid);
		if (!(await $users.get()).exists()) throw new HttpError('not-found', `User with id ${uid} not found`);
		return $users.update(user);
	}

	public async findById(uid: string): Promise<IUser> {
		const $users = this.getRef(uid);
		const user = await $users.get();
		if (!user.exists()) throw new HttpError('not-found', `User with id ${uid} not found`);
		return user.toJSON() as IUser;
	}

	public async find(resolver?: (data: IUser) => boolean): Promise<IUser[]> {
		const $users = this.getRef();
		const users = await $users.get();
		const res: IUser[] = [];

		users.forEach(user => {
			const json = user.toJSON() as IUser;
			if (!resolver || resolver(json)) res.push(json);
		});

		return res;
	}

	public async removeById(uid: string): Promise<void> {
		const $users = this.getRef(uid);
		if (!(await $users.get()).exists()) throw new HttpError('not-found', `User with id ${uid} not found`);
		await $users.remove();
	}
}

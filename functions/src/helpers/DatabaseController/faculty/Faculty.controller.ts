import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';

import {DatabaseController} from '../types';
import {HttpError} from '@errors/HttpError';
import {IFaculty, IFacultyPayload} from './types';

export class Faculty implements DatabaseController<IFacultyPayload, IFaculty> {
	private db: admin.database.Database;
	constructor(db: admin.database.Database) {
		this.db = db;
	}

	public async create(faculty: IFacultyPayload): Promise<IFaculty> {
		const uid = uniqid('faculty-');
		const f: IFaculty = {...faculty, id: uid};
		const $faculty = this.db.ref(`faculty/${uid}`);
		$faculty.set(f);
		return f;
	}

	public async findById(uid: string): Promise<IFaculty> {
		const $faculty = this.db.ref(`faculty/${uid}`);
		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id \`${uid}\` not found`);

		return faculty.toJSON() as IFaculty;
	}

	public async find(resolver?: (data: IFaculty) => boolean): Promise<IFaculty[]> {
		const $faculties = this.db.ref('faculty');
		const faculties = await $faculties.get();
		const res: IFaculty[] = [];
		faculties.forEach(f => {
			const data = f.toJSON() as IFaculty;
			if (!resolver || resolver(data)) res.push(data);
		});

		return res;
	}

	public async updateById(uid: string, data: Partial<IFacultyPayload>): Promise<IFaculty> {
		const $faculty = this.db.ref(`faculty/${uid}`);
		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id \`${uid}\` not found`);
		$faculty.set(data);

		const res = await $faculty.get();
		return res.toJSON() as IFaculty;
	}

	public async removeById(uid: string): Promise<void> {
		const $faculty = this.db.ref(`faculty/${uid}`);
		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id \`${uid}\` not found`);
		await $faculty.remove();
	}
}

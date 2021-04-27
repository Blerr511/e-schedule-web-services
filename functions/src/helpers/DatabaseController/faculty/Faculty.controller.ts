import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';

import {DatabaseController} from '../types';
import {HttpError} from '@errors/HttpError';
import {IFaculty, IFacultyPayload} from './types';
import {Ref} from '../Ref';

export class Faculty extends Ref implements DatabaseController<IFacultyPayload, IFaculty> {
	protected db: admin.database.Database;
	_ref = 'faculty';
	constructor(db: admin.database.Database) {
		super();
		this.db = db;
	}

	public async create(faculty: IFacultyPayload): Promise<IFaculty> {
		const uid = uniqid('faculty-');
		const f: IFaculty = {...faculty, uid};
		const $faculty = this.getRef(uid);
		$faculty.set(f);
		return f;
	}

	public async findById(uid: string): Promise<IFaculty> {
		const $faculty = this.getRef(uid);
		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id \`${uid}\` not found`);

		return faculty.toJSON() as IFaculty;
	}

	public async find(resolver?: (data: IFaculty) => boolean): Promise<IFaculty[]> {
		const $faculties = this.getRef();
		const faculties = await $faculties.get();
		const res: IFaculty[] = [];
		faculties.forEach(f => {
			const data = f.toJSON() as IFaculty;
			if (!resolver || resolver(data)) res.push(data);
		});

		return res;
	}

	public async updateById(uid: string, data: Partial<IFacultyPayload>): Promise<IFaculty> {
		const $faculty = this.getRef(uid);
		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id \`${uid}\` not found`);
		$faculty.update(data);

		const res = await $faculty.get();

		return res.toJSON() as IFaculty;
	}

	public async removeById(uid: string): Promise<void> {
		const $faculty = this.getRef(uid);
		const faculty = await $faculty.get();
		if (!faculty.exists()) throw new HttpError('not-found', `Faculty with id \`${uid}\` not found`);
		await $faculty.remove();
	}
}

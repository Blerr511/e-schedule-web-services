import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';
import {DatabaseController} from '../types';
import {HttpError} from '@errors/HttpError';
import {ILesson, ILessonPayload} from './types';

export class Lesson implements DatabaseController<ILessonPayload, ILesson> {
	private db: admin.database.Database;
	constructor(db: admin.database.Database) {
		this.db = db;
	}

	public async create(lesson: ILessonPayload): Promise<ILesson> {
		const uid = uniqid('user-');
		const $lesson = this.db.ref(`lessons/${uid}`);
		const data: ILesson = {...lesson, id: uid};
		await $lesson.set(data);
		return data;
	}

	public async find(resolver?: (data: ILesson) => boolean): Promise<ILesson[]> {
		const $lessons = this.db.ref('lessons');
		const lessons = await $lessons.get();
		const res: ILesson[] = [];
		lessons.forEach(l => {
			const data = l.toJSON() as ILesson;
			if (!resolver || resolver(data)) res.push(data);
		});
		return res;
	}

	public async findById(uid: string): Promise<ILesson> {
		const $lesson = this.db.ref(`lessons/${uid}`);
		const lesson = await $lesson.get();
		if (!lesson) throw new HttpError('not-found', `Lesson with id \`${uid}\` not found`);
		return lesson.toJSON() as ILesson;
	}

	public async updateById(uid: string, data: Partial<ILessonPayload>): Promise<ILesson> {
		const $lesson = this.db.ref(`lessons/${uid}`);
		const lesson = await $lesson.get();
		if (!lesson) throw new HttpError('not-found', `Lesson with id \`${uid}\` not found`);
		await $lesson.update(data);
		const res = await $lesson.get();

		return res.toJSON() as ILesson;
	}

	public async removeById(uid: string): Promise<void> {
		const $lesson = this.db.ref(`lessons/${uid}`);
		const lesson = await $lesson.get();
		if (!lesson) throw new HttpError('not-found', `Lesson with id \`${uid}\` not found`);
		await $lesson.remove();
	}
}

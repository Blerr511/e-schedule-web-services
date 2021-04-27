import * as admin from 'firebase-admin';
import * as uniqid from 'uniqid';
import {DatabaseController} from '../types';
import {HttpError} from '@errors/HttpError';
import {ILesson, ILessonPayload} from './types';
import {Ref} from '../Ref';

export class Lesson extends Ref implements DatabaseController<ILessonPayload, ILesson> {
	protected db: admin.database.Database;

	_ref = 'lessons';

	constructor(db: admin.database.Database) {
		super();
		this.db = db;
	}

	public async create(lesson: ILessonPayload): Promise<ILesson> {
		const uid = uniqid('lesson-');
		const $lesson = this.getRef(uid);
		const data: ILesson = {...lesson, uid};
		await $lesson.set(data);
		return data;
	}

	public async updateById(uid: string, data: Partial<ILessonPayload>): Promise<ILesson> {
		const $lesson = this.getRef(uid);
		const lesson = await $lesson.get();
		if (!lesson) throw new HttpError('not-found', `Lesson with id \`${uid}\` not found`);
		await $lesson.update(data);
		const res = await $lesson.get();

		return res.toJSON() as ILesson;
	}

	public async findById(uid: string): Promise<ILesson> {
		const $lesson = this.getRef(uid);
		const lesson = await $lesson.get();
		if (!lesson) throw new HttpError('not-found', `Lesson with id \`${uid}\` not found`);
		return lesson.toJSON() as ILesson;
	}

	public async find(resolver?: (data: ILesson) => boolean): Promise<ILesson[]> {
		const $lessons = this.getRef();
		const lessons = await $lessons.get();
		const res: ILesson[] = [];
		lessons.forEach(l => {
			const data = l.toJSON() as ILesson;
			if (!resolver || resolver(data)) res.push(data);
		});
		return res;
	}

	public async removeById(uid: string): Promise<void> {
		const $lesson = this.getRef(uid);
		const lesson = await $lesson.get();
		if (!lesson) throw new HttpError('not-found', `Lesson with id \`${uid}\` not found`);
		await $lesson.remove();
	}
}

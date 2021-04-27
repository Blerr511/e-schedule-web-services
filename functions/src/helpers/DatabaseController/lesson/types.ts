export interface ILessonPayload {
	name: string;
	facultyId: string;
}

export interface ILessonIdentifier {
	id: string;
}

export interface ILesson extends ILessonPayload, ILessonIdentifier {}

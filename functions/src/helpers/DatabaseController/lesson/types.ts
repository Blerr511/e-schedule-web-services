export interface ILessonPayload {
	name: string;
	facultyId: string;
}

export interface ILessonIdentifier {
	uid: string;
}

export interface ILesson extends ILessonPayload, ILessonIdentifier {}

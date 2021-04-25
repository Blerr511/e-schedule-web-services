export interface ILessonPayload {
	name: string;
	lecturerId: string;
	facultyId: string;
}

export interface ILessonIdentifier {
	id: string;
}

export interface ILesson extends ILessonPayload, ILessonIdentifier {}

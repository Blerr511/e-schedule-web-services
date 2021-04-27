export interface IFacultyPayload {
	name: string;
}

export interface IFacultyIdentifier {
	uid: string;
}

export interface IFaculty extends IFacultyPayload, IFacultyIdentifier {}

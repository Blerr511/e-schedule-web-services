export interface IFacultyPayload {
	name: string;
}

export interface IFacultyIdentifier {
	id: string;
}

export interface IFaculty extends IFacultyPayload, IFacultyIdentifier {}

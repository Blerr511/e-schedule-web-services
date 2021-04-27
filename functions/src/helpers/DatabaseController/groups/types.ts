export interface IGroupPayload {
	facultyId: string;
	name: string;
}

export interface IGroupIdentifier {
	uid: string;
}

export interface IGroup extends IGroupPayload, IGroupIdentifier {}

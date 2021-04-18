export interface IGroupPayload {
	name: string;
}

export interface IGroupIdentifier {
	id: string;
}

export interface IGroup extends IGroupPayload, IGroupIdentifier {}

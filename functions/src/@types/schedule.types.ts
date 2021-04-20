export interface ISchedulePayload {
	every: string;
	uri: 'string';
	description: string;
}

export interface IScheduleIdentifier {
	facultyId: string;
	groupId: string;
	id: string;
}

export interface ISchedule extends IScheduleIdentifier, ISchedulePayload {}

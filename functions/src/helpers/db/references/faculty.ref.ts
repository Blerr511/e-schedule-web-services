export const getFaculties = (): string => 'faculty';

export const getFaculty = (facultyId: string): string => `${getFaculties()}/${facultyId}`;

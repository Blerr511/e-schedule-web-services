export const student = 'student' as const;
export const lecturer = 'lecturer' as const;
export const admin = 'admin' as const;

const ROLES = Object.freeze({
	student,
	lecturer,
	admin
});

export type Role = keyof typeof ROLES;

export default ROLES;

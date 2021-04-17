export const student = 0 as const;
export const lecturer = 1 as const;
export const admin = 2 as const;

const ROLES = Object.freeze({
	student,
	lecturer,
	admin
});

export type Role = keyof typeof ROLES;

export default ROLES;

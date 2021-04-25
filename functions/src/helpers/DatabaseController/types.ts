export interface DatabaseController<T = unknown> {
	create: (uid: string, data: T) => Promise<unknown>;
	updateById: (uid: string, data: Partial<T>) => Promise<unknown>;
	findById: (uid: string) => Promise<T>;
	find: (resolver: (data: T) => boolean) => Promise<T[]>;
}

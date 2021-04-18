export interface MetaItem<V = void> {
	type: 'error' | 'warning' | 'info';
	message: string;
	value?: V;
}

export type Meta<M extends string = string> = Record<M, MetaItem>;

export interface DefaultResponse<D = unknown, M extends string = string> {
	status: 'ok' | 'error';
	message: string;
	data?: D;
	meta?: Meta;
}

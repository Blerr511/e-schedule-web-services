import {FunctionsErrorCode} from 'firebase-functions/lib/providers/https';

export interface MetaItem<V = unknown> {
	type: 'error' | 'warning' | 'info';
	message: string;
	value?: V;
}

export type Meta<M extends string = string> = Record<M, MetaItem>;

export interface DefaultResponse<D = unknown, M extends string = string> {
	status: 'ok' | 'error';
	message: string;
	data?: D;
	meta?: Meta<M>;
}

export interface ErrorResponse extends Omit<DefaultResponse, 'data'> {
	code?: FunctionsErrorCode;
}

type PD = import('express-serve-static-core').ParamsDictionary;

export type ParamsDictionary<P = undefined> = PD & P;

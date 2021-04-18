import {Meta} from '@types';

export class HttpError extends Error {
	code = 400;
	meta: Meta | undefined;
	constructor(message?: string, code?: number, meta?: Meta) {
		super(message);
		if (code) this.code = code;
		if (meta) this.meta = meta;
	}
}

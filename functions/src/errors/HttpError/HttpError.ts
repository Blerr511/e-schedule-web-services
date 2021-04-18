import {Meta} from '@types';
import {FunctionsErrorCode, HttpsError} from 'firebase-functions/lib/providers/https';
export class HttpError extends HttpsError {
	meta?: Meta;
	constructor(code: FunctionsErrorCode, message: string, meta?: Meta) {
		super(code, message, meta);
		this.meta = meta;
	}
}

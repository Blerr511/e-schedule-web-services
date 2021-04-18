import {auth} from 'firebase-admin/lib/auth';

export type JWTUser = Pick<auth.UserRecord, 'uid' | 'email' | 'displayName'>;

import {Role} from '@config/roles';
import {IDBElement} from '../types';

export interface IUserPayload {
	role: Role;
}

export interface IUser extends IDBElement, IUserPayload {}

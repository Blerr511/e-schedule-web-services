import {Role} from '@config/roles';
import {DBItem} from '@helpers/DatabaseController/data.types';

export interface IUserPayload {
	role: Role;
}

export interface IUser extends DBItem, IUserPayload {}

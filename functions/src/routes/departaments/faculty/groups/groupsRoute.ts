import {Router} from 'express';
import {groups} from '@controllers/departments';

export const groupsRoute = Router();

groupsRoute.get('/', groups.getGroups);
groupsRoute.post('/', groups.createGroup);
groupsRoute.put('/', groups.editGroup);
groupsRoute.delete('/', groups.removeGroup);

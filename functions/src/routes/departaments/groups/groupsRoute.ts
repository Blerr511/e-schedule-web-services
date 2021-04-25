import {Router} from 'express';
import {groups} from '@controllers/departments';

export const groupsRoute = Router();

groupsRoute.get('/:id?', groups.getGroups);

groupsRoute.put('/', groups.createGroup);

groupsRoute.patch('/:id', groups.editGroup);

groupsRoute.delete('/:id', groups.removeGroup);

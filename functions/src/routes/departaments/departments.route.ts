import {Router} from 'express';
import {facultyRote} from './faculty';
import {groupsRoute} from './groups';

export const departmentsRoute = Router();

departmentsRoute.use('groups', groupsRoute);
departmentsRoute.use('faculties', facultyRote);

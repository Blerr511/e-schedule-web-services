import {createLecturer, getLecturersList} from '@controllers/users/admins';
import {withRoles} from '@middlewares/role.middleware';
import {Router} from 'express';

export const adminsRoute = Router();

adminsRoute.use(withRoles('admin'));

adminsRoute.get('/lecturers', getLecturersList);
adminsRoute.post('/createLecturer', createLecturer);

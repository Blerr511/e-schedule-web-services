import {
	createLecturer,
	getLecturersList,
	addLecturerLesson,
	removeLecturerLesson
} from '@controllers/users/admins';
import {withRoles} from '@middlewares/role.middleware';
import {Router} from 'express';

export const adminsRoute = Router();

adminsRoute.use(withRoles('admin'));

adminsRoute.get('/lecturer', getLecturersList);
adminsRoute.post('/lecturer', createLecturer);
adminsRoute.put('/lecturer/:id/lesson', addLecturerLesson);
adminsRoute.delete('/lecturer/:id/lesson', removeLecturerLesson);

import {createLecturer, getLecturersList} from '@controllers/users/admins';
import {Router} from 'express';

export const adminsRoute = Router();

adminsRoute.get('/lecturers', getLecturersList);
adminsRoute.post('/createLecturer', createLecturer);

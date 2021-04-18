import {createLecturer} from '@controllers/users/admins';
import {Router} from 'express';

export const adminsRoute = Router();

adminsRoute.post('/createLecturer', createLecturer);

import {Router} from 'express';
import {getStudentSettings, setStudentSettings} from '@controllers/users/students';

export const studentsRoute = Router();

studentsRoute.get('/settings', getStudentSettings);
studentsRoute.post('/settings', setStudentSettings);

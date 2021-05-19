import {createSchedule} from '@controllers/schedule';
import {Router} from 'express';

export const scheduleRouter = Router();

scheduleRouter.post('/', createSchedule);

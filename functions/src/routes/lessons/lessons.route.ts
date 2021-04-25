import {Router} from 'express';
import {createLesson, removeLesson, getLesson} from '@controllers/lessons';

export const lessonsRoute = Router();

lessonsRoute.get('/:id?', getLesson);
lessonsRoute.put('/', createLesson);
lessonsRoute.delete('/:id', removeLesson);

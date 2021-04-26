import {Router} from 'express';
import {createLesson, removeLesson, getLesson, editLesson} from '@controllers/lessons';

export const lessonsRoute = Router();

lessonsRoute.get('/:id?', getLesson);
lessonsRoute.put('/', createLesson);
lessonsRoute.patch('/:id', editLesson);
lessonsRoute.delete('/:id', removeLesson);

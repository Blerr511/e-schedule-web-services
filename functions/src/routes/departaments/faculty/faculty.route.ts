import {faculty} from '@controllers/departments';
import {Router} from 'express';

export const facultyRote = Router();

facultyRote.get('/:id?', faculty.getFaculties);
facultyRote.put('/', faculty.createFaculty);
facultyRote.patch('/:id', faculty.editFaculty);
facultyRote.delete('/:id', faculty.removeFaculty);

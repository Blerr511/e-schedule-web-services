import {faculty} from '@controllers/departments';
import {Router} from 'express';
import {groupsRoute} from './groups';

export const facultyRote = Router();

facultyRote.get('/', faculty.getFaculties);
facultyRote.post('/', faculty.createFaculty);
facultyRote.put('/:id', faculty.editFaculty);
facultyRote.delete('/:id', faculty.removeFaculty);

facultyRote.use('/:id/groups/:groupId?', groupsRoute);

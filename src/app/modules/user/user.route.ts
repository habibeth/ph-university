import express from 'express';
import { UserControllers } from './user.controller';
import { studentValidations } from '../student/student.validation';
import validateRequest from '../../middleware/validateRequest';
import { createAdminValidationSchema } from '../admin/admin.validation';
import { createFacultyValidationSchema } from '../faculty/faculty.validation';
import auth from '../../middleware/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();





router.post(
    '/create-student',
    auth(USER_ROLE.admin),
    validateRequest(studentValidations.createStudentValidationSchema),
    UserControllers.createStudent
)

router.post(
    '/create-faculty',
    // auth(USER_ROLE.admin),
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty,
);

router.post(
    '/create-admin',
    auth(USER_ROLE.admin),
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
);


router.post(
    '/me',
    auth(USER_ROLE.admin, USER_ROLE.faculty, USER_ROLE.student),
    UserControllers.createFaculty,
);

export const UserRoutes = router;
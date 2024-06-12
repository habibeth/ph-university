import { Router } from "express";
import { SemesterRegistrationControllers } from "./semesterRegistration.controller";



const router = Router();

router.get('/:id', SemesterRegistrationControllers.getSingleSemesterRegistration);

router.patch(
    '/:id',
    SemesterRegistrationControllers.updateSemesterRegistration,
);

router.get('/', SemesterRegistrationControllers.getAllSemesterRegistration);
router.delete('/:id', SemesterRegistrationControllers.deleteSemesterRegistration);
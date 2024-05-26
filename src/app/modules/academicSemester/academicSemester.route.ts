import { Router } from "express";
import { AcademicSemesterController } from "./academicSemester.controller";
import validateRequest from "../../middleware/validateRequest";
import { AcademicSemesterValidations } from "./academicValidation.validation";


const router = Router();

router.post('/create-academic-semester', validateRequest(AcademicSemesterValidations.createAcademicSemesterValidationSchema), AcademicSemesterController.createAcademicSemester)


export const AcademicSemesterRoutes = router;
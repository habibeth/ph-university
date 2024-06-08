import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const route = Router();

route.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse);
route.get('/', CourseControllers.getAllCorses);
route.get('/:id', CourseControllers.getSingleCourse);
route.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse);
route.delete('/:id', CourseControllers.deleteCourse)



export const CourseRoutes = route
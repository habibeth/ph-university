import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { CourseValidations } from "./course.validation";
import { CourseControllers } from "./course.controller";

const route = Router();

route.post('/create-course', validateRequest(CourseValidations.createCourseValidationSchema), CourseControllers.createCourse);
route.get('/', CourseControllers.getAllCorses);
route.get('/:id', CourseControllers.getSingleCourse);
route.put('/:courseId/assign-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.assignFacultiesWithCourse);
route.delete('/:courseId/remove-faculties', validateRequest(CourseValidations.facultiesWithCourseValidationSchema), CourseControllers.removeFacultiesFromCourse);
route.patch('/:id', validateRequest(CourseValidations.updateCourseValidationSchema), CourseControllers.updateCourse);
route.delete('/:id', CourseControllers.deleteCourse)



export const CourseRoutes = route
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { CourseServices } from "./course.service";


const createCourse = catchAsync(async (req, res) => {
    const result = await CourseServices.createCourseIntoDB(req.body);
    sendResponse(res, {
        message: "Course Created Successfully!",
        data: result
    })
})


const getAllCorses = catchAsync(async (req, res) => {
    const result = await CourseServices.getAllCoursesFromDB();
    sendResponse(res, {
        message: "Get All Course Successfully!",
        data: result
    })
})


const getSingleCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.getSingleCourseFromDB(id);
    sendResponse(res, {
        message: "Get Course Successfully!",
        data: result
    })
})


const deleteCourse = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await CourseServices.deleteCourseFromDB(id);
    sendResponse(res, {
        message: "Course Deleted Successfully!",
        data: result
    })
})


export const CourseControllers = {
    createCourse,
    getAllCorses,
    getSingleCourse,
    deleteCourse
}

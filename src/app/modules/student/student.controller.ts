import { RequestHandler } from "express";
import { StudentServices } from "./student.service";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";



const getAllStudents: RequestHandler = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentFromDB();

    sendResponse(res, {
        message: 'Student are retrieved Successfully',
        data: result
    })
})

const getSingleStudent: RequestHandler = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);

    sendResponse(res, {
        message: "Student are retrieved Successfully",
        data: result
    })
})


const deleteStudent: RequestHandler = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.deleteStudentFromDB(studentId);

    sendResponse(res, {
        message: "Student Data Deleted Successfully",
        data: result
    })
})



export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}
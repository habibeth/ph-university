import { NextFunction, Request, Response } from "express";
import { StudentServices } from "./student.service";
import studentValidationSchema from "./student.validation";
import { sendResponse } from "../../utils/sendResponse";

const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentFromDB();

        sendResponse(res, {
            message: 'Student are retrieved Successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}

const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        sendResponse(res, {
            message: "Student are retrieved Successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


const deleteStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.deleteStudentFromDB(studentId);

        sendResponse(res, {
            message: "Student Data Deleted Successfully",
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
    deleteStudent,
}
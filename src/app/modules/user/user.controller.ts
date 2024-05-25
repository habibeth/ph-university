import { NextFunction, Request, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";

const createStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { password, student: studentData } = req.body;

        const result = await UserServices.createStudentIntoDB(password, studentData);
        sendResponse(res, {
            message: 'Student created Successfully',
            data: result
        })
    } catch (error) {
        next(error)
    }
}


export const UserControllers = {
    createStudent
}
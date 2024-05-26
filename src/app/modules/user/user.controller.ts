import { NextFunction, Request, RequestHandler, Response } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        message: 'Student created Successfully',
        data: result
    })
})


export const UserControllers = {
    createStudent
}
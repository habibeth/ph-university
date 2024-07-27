import { RequestHandler } from "express";
import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import catchAsync from "../../utils/catchAsync";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";
import { verifyToken } from "../Auth/auth.utils";
import config from "../../config";

const createStudent: RequestHandler = catchAsync(async (req, res) => {
    const { password, student: studentData } = req.body;

    const result = await UserServices.createStudentIntoDB(password, studentData);
    sendResponse(res, {
        message: 'Student created Successfully',
        data: result
    })
})

const createFaculty = catchAsync(async (req, res) => {
    const { password, faculty: facultyData } = req.body;

    const result = await UserServices.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
        message: 'Faculty is created successfully',
        data: result,
    });
});

const createAdmin = catchAsync(async (req, res) => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(password, adminData);

    sendResponse(res, {
        message: 'Admin is created successfully',
        data: result,
    });
});
const getMe = catchAsync(async (req, res) => {
    const token = req.headers.authorization;
    if (!token) {
        throw new AppError(httpStatus.NOT_FOUND, "You are not Authorize")
    }
    const decoded = verifyToken(token, config.jwt_refresh_secret as string)
    const result = await UserServices.getMeIntoDB(token);

    sendResponse(res, {
        message: 'Admin is created successfully',
        data: result,
    });
});


export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin,
    getMe
}
import { RequestHandler } from "express";
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


export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin
}
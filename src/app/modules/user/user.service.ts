import httpStatus from "http-status";
import config from "../../config";
import { AppError } from "../../error/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface"
import { User } from "./user.model"
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";



const createStudentIntoDB = async (password: string, payload: TStudent) => {
    //create user object
    const userData: Partial<TUser> = {}
    //if password not given
    userData.password = password || config.default_password as string

    //student role
    userData.role = 'student';




    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError(httpStatus.NOT_FOUND, 'Admission Semester not Found')
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        //set automatically generated id
        userData.id = await generateStudentId(admissionSemester)

        //create a user
        //session 1 transaction 1
        const newUser = await User.create([userData], { session });

        //create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Create User!")
        }
        //set id , _id as user
        payload.id = newUser[0].id;
        payload.user = newUser[0]._id;  //reference id

        //transaction 2
        const newStudent = await Student.create([payload], { session });

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Create Student!")
        }

        await session.commitTransaction();
        await session.endSession()

        return newStudent;

    } catch (err) {
        await session.abortTransaction();
        await session.endSession()
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to Create These Data!")
    }
}


export const UserServices = {
    createStudentIntoDB,
}
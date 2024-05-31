import { Student } from "./student.model";
import { TStudent } from "./student.interface";
import mongoose from "mongoose";
import { AppError } from "../../error/AppError";
import httpStatus from "http-status";
import { User } from "../user/user.model";



const getAllStudentFromDB = async () => {
    const result = await Student.find().populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result
}

const getSingleStudentFromDB = async (id: string) => {
    // const result = await Student.findOne({ id });

    // const result = await Student.aggregate([
    //     { $match: { id: id } }
    // ])
    const result = await Student.findOne({ id }).populate('admissionSemester').populate({
        path: 'academicDepartment',
        populate: {
            path: 'academicFaculty'
        }
    });
    return result;
}

const updateAStudentFromDB = async (id: string, payload: Partial<TStudent>) => {

    const { name, guardians, localGuardians, ...remainingStudentData } = payload;

    const modifiedUpdateData: Record<string, unknown> = {
        ...remainingStudentData
    };

    if (name && Object.keys(name).length) {
        for (const [key, value] of Object.entries(name)) {
            modifiedUpdateData[`name.${key}`] = value;
        }
    }


    if (guardians && Object.keys(guardians).length) {
        for (const [key, value] of Object.entries(guardians)) {
            modifiedUpdateData[`guardians.${key}`] = value;
        }
    }


    if (localGuardians && Object.keys(localGuardians).length) {
        for (const [key, value] of Object.entries(localGuardians)) {
            modifiedUpdateData[`localGuardians.${key}`] = value;
        }
    }

    const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, { new: true, runValidators: true });
    return result;
}

const deleteStudentFromDB = async (id: string) => {
    const existingStudent = await Student.findOne({ id });
    if (!existingStudent) {
        throw new AppError(httpStatus.NOT_FOUND, "Student does not Exists!")
    }


    const session = await mongoose.startSession()
    try {
        session.startTransaction()
        const deletedStudent = await Student.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        );
        if (!deletedStudent) {
            throw new AppError(httpStatus.BAD_REQUEST, "Student does not Exists!")
        }
        const deletedUser = await User.findOneAndUpdate(
            { id },
            { isDeleted: true },
            { new: true, session }
        )
        if (!deletedUser) {
            throw new AppError(httpStatus.BAD_REQUEST, "User does not Exists!")
        }

        await session.commitTransaction();
        await session.endSession()

        return deletedStudent;
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        // throw new AppError(httpStatus.BAD_REQUEST, "Deleted Operation Cannot Successfully!")
    }

}

export const StudentServices = {
    // createStudentIntoDB,
    getAllStudentFromDB,
    getSingleStudentFromDB,
    deleteStudentFromDB,
    updateAStudentFromDB
}
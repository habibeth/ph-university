import httpStatus from "http-status";
import { AppError } from "../../error/AppError";
import { OfferedCourse } from "../OfferedCourse/OfferedCourse.model";
import { TEnrolledCourse } from "./enrolledCourse.interface";
import { EnrolledCourse } from "./enrolledCourse.model";
import { Student } from "../student/student.model";
import mongoose from "mongoose";

const createEnrolledCourseIntoDB = async (
    userId: string,
    payload: TEnrolledCourse,
) => {
    /**
     * Step1: Check if the offered courses is exists
     * Step2: Check if the student is already enrolled
     * Step3: Check if the max credits exceed
     * Step4: Create an enrolled course
     */
    const { offeredCourse } = payload;
    const isOfferedCourse = await OfferedCourse.findById(offeredCourse)
    if (!isOfferedCourse) {
        throw new AppError(httpStatus.NOT_FOUND, "Offered Course is not Exists!");
    }

    if (isOfferedCourse?.maxCapacity <= 0) {
        throw new AppError(httpStatus.BAD_REQUEST, "Room is Full!");
    }

    const student = await Student.findOne({ id: userId }).select('_id')
    if (!isOfferedCourse) {
        throw new AppError(httpStatus.NOT_FOUND, "Student is not Exists!");
    }

    const isStudentAlreadyEnrolled = await EnrolledCourse.findOne({
        semesterRegistration: isOfferedCourse.semesterRegistration,
        offeredCourse,
        student: student?._id
    })

    if (isStudentAlreadyEnrolled) {
        throw new AppError(httpStatus.FORBIDDEN, "You have Already Enrolled This Course!");
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const result = await EnrolledCourse.create([{
            semesterRegistration: isOfferedCourse.semesterRegistration,
            academicSemester: isOfferedCourse.academicSemester,
            academicFaculty: isOfferedCourse.academicFaculty,
            academicDepartment: isOfferedCourse.academicDepartment,
            offeredCourse: offeredCourse,
            course: isOfferedCourse.course,
            student: student?._id,
            faculty: isOfferedCourse.faculty,
            isEnrolled: true,
        }], { session })

        if (!result) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to Enrolled in This course!");
        }

        const maxCapacity = isOfferedCourse?.maxCapacity;
        await OfferedCourse.findByIdAndUpdate(offeredCourse, {
            maxCapacity: maxCapacity - 1
        }, { new: true })

        await session.commitTransaction();
        await session.endSession();

        return result;
    } catch (err: any) {
        await session.abortTransaction();
        await session.endSession();
        throw new Error(err);
    }

};

export const EnrolledCourseServices = {
    createEnrolledCourseIntoDB
}
import { Types } from "mongoose";

type Days = 'Sat' | 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri';

export type TOfferedCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester?: Types.ObjectId;
    academicFaculty: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    course: Types.ObjectId;
    faculty: Types.ObjectId;
    maxCapacity: number;
    section: Number;
    days: Days[];
    startTime: string;
    endTime: string;
}
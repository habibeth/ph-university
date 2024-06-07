import { Model, Types } from "mongoose";
import { TBloodGroup, TGender, TUserName } from "../../interface/userInfoInterface";

export type TFaculty = {
    id: string;
    user: Types.ObjectId;
    designation: string;
    name: TUserName;
    gender: TGender;
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloogGroup?: TBloodGroup;
    presentAddress: string;
    permanentAddress: string;
    profileImg?: string;
    academicDepartment: Types.ObjectId;
    isDeleted: boolean;
};

export interface FacultyModel extends Model<TFaculty> {
    isUserExists(id: string): Promise<TFaculty | null>;
}
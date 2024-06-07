import { Schema, Types, model } from "mongoose";
import { TCourse, TPreRequisiteCourses } from "./course.interface";


const preRequisiteCoursesSchema = new Schema<TPreRequisiteCourses>({
    course: {
        type: Schema.Types.ObjectId,
        ref: 'Course'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
})

const courseSchema = new Schema<TCourse>({
    title: {
        type: String,
        unique: true,
        trim: true,
        required: [true, "Title is Required!"]
    },
    prefix: {
        type: String,
        trim: true,
        required: [true, "Prefix is Required!"]
    },
    code: {
        type: Number,
        trim: true,
        required: [true, "Code is Required!"]
    },
    credits: {
        type: Number,
        trim: true,
        required: [true, "Code is Required!"]
    },
    preRequisiteCourses: [preRequisiteCoursesSchema],
})


export const Course = model<TCourse>('Course', courseSchema)
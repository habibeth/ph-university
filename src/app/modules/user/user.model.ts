import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import config from "../../config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser>({
    id: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    needPasswordChange: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        enum: ['admin', 'faculty', 'student']
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
        default: 'in-progress'
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    // console.log(this, "Student Schema Before The Save Data!");
    // password Hashing 
    const user = this; //documents
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcrypt_salt_rounds)
    );

    next();
})


//set empty string 
userSchema.post('save', async function (doc, next) {
    doc.password = ""
    // console.log(this, "Student Schema After The Save Data!");
    next()
})

export const User = model<TUser>("User", userSchema)
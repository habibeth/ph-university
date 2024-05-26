import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { AcademicSemesterServices } from "./academicSemester.service";



const createAcademicSemester = catchAsync(async (req, res) => {
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDB(req.body)
    sendResponse(res, {
        message: "Create Semester Successfully!",
        data: result
    })
})

export const AcademicSemesterController = {
    createAcademicSemester
}
import catchAsync from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { SemesterRegistrationServices } from "./semesterRegistration.service";

const getSingleSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.getSingleSemesterRegistrationFromDB(id);

    sendResponse(res, {
        message: 'Faculty is retrieved successFully',
        data: result,
    })
})

const getAllSemesterRegistration = catchAsync(async (req, res) => {
    const query = req.query
    const result = await SemesterRegistrationServices.getAllSemesterRegistrationFromDB(query);

    sendResponse(res, {
        message: 'Faculties are retrieved successfully',
        data: result,
    })
})

const updateSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const { faculty } = req.body;
    const result = await SemesterRegistrationServices.updateSemesterRegistrationIntoDB(id, faculty);

    sendResponse(res, {
        message: 'Faculties are retrieved successfully',
        data: result,
    })
})

const deleteSemesterRegistration = catchAsync(async (req, res) => {
    const { id } = req.params;
    const result = await SemesterRegistrationServices.deleteSemesterRegistrationFromDB(id);

    sendResponse(res, {
        message: 'Faculty is deleted successfully',
        data: result,
    });
});

export const SemesterRegistrationControllers = {
    getAllSemesterRegistration,
    getSingleSemesterRegistration,
    updateSemesterRegistration,
    deleteSemesterRegistration,
};
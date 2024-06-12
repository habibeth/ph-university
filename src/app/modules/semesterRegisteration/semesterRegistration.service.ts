



const getAllSemesterRegistrationFromDB = async (query: Record<string, unknown>) => {
    const result = await ;
    return result;
};

const getSingleSemesterRegistrationFromDB = async (id: string) => {
    const result = await ;

    return result;
};

const updateSemesterRegistrationIntoDB = async (id: string, payload) => {


    const result = await ;
    return result;
};

const deleteSemesterRegistrationFromDB = async (id: string) => {

    const result = await .findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true },
    );
    return result;
};

export const SemesterRegistrationServices = {
    getAllSemesterRegistrationFromDB,
    getSingleSemesterRegistrationFromDB,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB
};
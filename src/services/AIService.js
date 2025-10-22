import {axiosInstance} from "../utils/AxiosHelper.js";

export const getDashboardData = async () => {

    const response = await axiosInstance.post('/ai/suggestions')
    return response.data;

}
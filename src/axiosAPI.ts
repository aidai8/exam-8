import axios from "axios";
import {BASE_URL} from "./globalConstants.ts";


const axiosAPI = axios.create({
    baseURL: BASE_URL,
});

export default axiosAPI;
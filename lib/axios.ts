import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://api.alquran.cloud/v1/",
})

export default axiosInstance;

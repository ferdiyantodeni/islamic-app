import axios from "axios";

const axiosInstance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL ?? "https://api.alquran.cloud/v1",
})

export default axiosInstance;
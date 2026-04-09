import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchSurah() {
    return useQuery({
        queryKey: ["surah-list"],
        queryFn: async () => {
            const response = await axiosInstance.get("https://api.alquran.cloud/v1/surah");
            return response?.data?.data;
        },
        staleTime: Infinity,
    });
}

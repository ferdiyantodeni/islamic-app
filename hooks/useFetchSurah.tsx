import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export default function useFetchSurah() {
    return useQuery({
        queryKey: ["surah-list"],
        queryFn: async () => {
            const response = await axiosInstance.get("surah");
            return response?.data?.data
        },
        staleTime: Infinity
    });
}

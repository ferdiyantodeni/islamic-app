import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchSurah() {
    return useQuery({
        queryKey: ["surah-list"],
        queryFn: async () => {
            const response = await axios.get('https://api.alquran.cloud/v1/surah');
            return response?.data?.data;
        },
        staleTime: Infinity,
    });
}

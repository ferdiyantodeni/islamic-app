import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchSurah() {
    return useQuery({
        queryKey: ["surah-list"],
        queryFn: async () => {
            const response = await axios.get('/api/surah');
            return response?.data?.data;
        },
        staleTime: Infinity,
    });
}

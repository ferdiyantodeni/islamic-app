import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchDua() {
    return useQuery({
        queryKey: ["list-doa"],
        queryFn: async () => {
            const response = await axios.get("https://equran.id/api/doa");
            return response?.data?.data;
        }
    });
}

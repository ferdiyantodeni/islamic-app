import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchProvince() {
    return useQuery({
        queryKey: ["get-provinces"],
        queryFn: async () => {
            const response = await axios.get("/api/provinces");
            return response?.data?.data?.map((prov: string, index: number) => ({
                id: index,
                value: prov,
                label: prov,
            }));
        },
    });
}

import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function useFetchCity({ selectedProvince }: { selectedProvince: string }) {
    return useQuery({
        queryKey: ["get-cities", selectedProvince],
        queryFn: async () => {
            const response = await axios.post("https://equran.id/api/v2/shalat/kabkota", {
                provinsi: selectedProvince,
            });
            return response?.data?.data?.map((city: string, index: number) => ({
                id: index,
                value: city,
                label: city,
            }));
        },
        enabled: !!selectedProvince,
    });
}

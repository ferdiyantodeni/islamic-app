import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

interface TafsirData {
    nomor: number;
    nama: string;
    namaLatin: string;
    jumlahAyat: number;
    tempatTurun: string;
    arti: string;
    deskripsi: string;
    tafsir: Array<{
        ayat: number;
        teks: string;
    }>;
}

export default function useFetchTafsir(tafsirId: string) {
    return useQuery({
        queryKey: ["tafsir", tafsirId],
        queryFn: async () => {
            const response = await axiosInstance.get(`/tafsir/${tafsirId}`);
            return response?.data?.data as TafsirData;
        },
        enabled: !!tafsirId,
        staleTime: Infinity,
    });
}
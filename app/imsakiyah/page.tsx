"use client"

import Sidebar from "@/components/sidebar";
import Combobox from "@/components/ui/combobox";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

interface ScheduleDataType {
    tanggal: number
    imsak: string
    subuh: string
    terbit: string
    dhuha: string
    dzuhur: string
    ashar: string
    maghrib: string
    isya: string
}

export default function ImsakiyahPage() {
    const [selectedProvince, setSelectedProvince] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");

    const { data: provincesData, isLoading: isProvincesLoading } = useQuery({
        queryKey: ["get-provinces"],
        queryFn: async () => {
            const response = await axios.get("https://equran.id/api/v2/imsakiyah/provinsi");
            return response?.data?.data?.map((prov: string, index: number) => ({
                id: index,
                value: prov,
                label: prov,
            }));
        },
    });

    const { data: citiesData, isPending: isCitiesLoading } = useQuery({
        queryKey: ["get-cities", selectedProvince],
        queryFn: async () => {
            const response = await axios.post("https://equran.id/api/v2/imsakiyah/kabkota", {
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

    const { data: scheduleData, isPending: isScheduleLoading } = useQuery({
        queryKey: ["get-schedule", selectedProvince, selectedCity],
        queryFn: async () => {
            const response = await axios.post("https://equran.id/api/v2/imsakiyah", {
                provinsi: selectedProvince,
                kabkota: selectedCity,
            });
            return response?.data?.data?.imsakiyah;
        },
        enabled: !!selectedProvince && !!selectedCity,
    });

    const handleProvinceChange = (value: string) => {
        setSelectedProvince(value);
        setSelectedCity("");
    };

    return (
        <div className="flex w-full">
            <Sidebar />
            <div className="px-7 sm:px-14 py-5 sm:py-7 flex-1 overflow-auto">
                <div className="mb-6">
                    <h1 className="text-xl sm:text-2xl font-semibold">Imsakiyah</h1>
                    <p className="text-xs sm:text-sm text-slate-500">Check imsak and iftar schedules in your area</p>
                </div>

                <div className="bg-white rounded-2xl shadow-xs border border-slate-200 p-5 mb-8 transition-all hover:shadow-sm">
                    <h2 className="font-semibold text-slate-900 mb-3">Select Location</h2>
                    <div className="flex flex-wrap gap-3">
                        <Combobox
                            label="Province"
                            value={selectedProvince}
                            options={provincesData || []}
                            disabled={isProvincesLoading}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" /><circle cx="12" cy="10" r="3" /></svg>
                            }
                            onChange={(val) => handleProvinceChange(val)}
                        />
                        <Combobox
                            label="City"
                            value={selectedCity}
                            options={citiesData || []}
                            disabled={!selectedProvince || isCitiesLoading}
                            icon={
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
                            }
                            onChange={(val) => setSelectedCity(val)}
                        />
                    </div>
                </div>

                {selectedCity && (
                    <div>
                        <div className="mb-6">
                            <h2 className="text-lg sm:text-xl font-semibold text-slate-900">Jadwal Imsakiyah</h2>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">{selectedCity}</p>
                        </div>

                        {isScheduleLoading ? (
                            <div className="flex items-center justify-center py-12">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-500"></div>
                            </div>
                        ) : scheduleData && scheduleData.length > 0 ? (
                            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden transition-all hover:shadow-md">
                                <div className="overflow-x-auto">
                                    <table className="w-full">
                                        <thead>
                                            <tr className="bg-linear-to-r from-emerald-50 to-emerald-50 text-emerald-900 border-b border-slate-200">
                                                <th className="p-4 text-center text-sm font-semibold">Tanggal</th>
                                                <th className="p-4 text-left text-sm font-semibold">Imsak</th>
                                                <th className="p-4 text-left text-sm font-semibold">Subuh</th>
                                                <th className="p-4 text-left text-sm font-semibold">Terbit</th>
                                                <th className="p-4 text-left text-sm font-semibold">Dhuha</th>
                                                <th className="p-4 text-left text-sm font-semibold">Dzuhur</th>
                                                <th className="p-4 text-left text-sm font-semibold">Ashar</th>
                                                <th className="p-4 text-left text-sm font-semibold">Maghrib</th>
                                                <th className="p-4 text-left text-sm font-semibold">Isya</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-200">
                                            {scheduleData.map((schedule: ScheduleDataType, index: number) => (
                                                <tr key={index} className="hover:bg-slate-50 transition-colors duration-150">
                                                    <td className="p-4 text-center text-sm font-semibold text-emerald-600">{schedule.tanggal}</td>
                                                    <td className="p-4 text-sm font-semibold text-emerald-700">{schedule.imsak}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.subuh}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.terbit}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.dhuha}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.dzuhur}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.ashar}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.maghrib}</td>
                                                    <td className="p-4 text-sm text-slate-700">{schedule.isya}</td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center py-12 bg-white rounded-2xl border border-slate-200">
                                <p className="text-slate-500">Data jadwal tidak tersedia</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
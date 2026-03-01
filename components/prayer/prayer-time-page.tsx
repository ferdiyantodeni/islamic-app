"use client"

import { useState, useEffect } from "react"

interface PrayerTime {
    name: string
    time: string
    icon: string
}

export default function PrayerTimePage() {
    const [prayerTimes, setPrayerTimes] = useState<PrayerTime[]>([
        { name: "Subuh", time: "04:45", icon: "🌙" },
        { name: "Dzuhur", time: "12:15", icon: "☀️" },
        { name: "Ashar", time: "15:30", icon: "🌤️" },
        { name: "Maghrib", time: "18:00", icon: "🌅" },
        { name: "Isya", time: "19:30", icon: "🌙" }
    ])

    const [nextPrayer, setNextPrayer] = useState<string>("Dzuhur")
    const [timeRemaining, setTimeRemaining] = useState<string>("2h 30m")

    useEffect(() => {
        const timer = setInterval(() => {
            const now = new Date()
            const hours = now.getHours()
            const minutes = now.getMinutes()
            const currentTime = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`

            const times = ["04:45", "12:15", "15:30", "18:00", "19:30"]
            const labels = ["Subuh", "Dzuhur", "Ashar", "Maghrib", "Isya"]

            let nextPrayerIndex = 0
            for (let i = 0; i < times.length; i++) {
                if (currentTime < times[i]) {
                    nextPrayerIndex = i
                    break
                }
                nextPrayerIndex = 0
            }

            setNextPrayer(labels[nextPrayerIndex])
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <div className="px-14 py-7 flex-1 overflow-auto">
            <div>
                <h1 className="text-2xl font-bold">Prayer Time</h1>
                <p className="text-sm text-slate-400">View prayer times for today</p>
            </div>

            <div className="py-6">
                <div className="bg-linear-to-br from-emerald-500 to-emerald-600 rounded-xl p-8 text-white shadow-lg">
                    <p className="text-sm font-medium opacity-90 mb-2">Next Prayer</p>
                    <h2 className="text-4xl font-bold mb-2">{nextPrayer}</h2>
                    <p className="text-emerald-100 text-lg">In {timeRemaining}</p>
                </div>
            </div>

            <div className="py-4">
                <h3 className="text-lg font-semibold text-slate-800 mb-4">Today&apos;s Prayer Times</h3>
                <div className="space-y-3">
                    {prayerTimes.map((prayer, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between p-4 bg-white rounded-lg border border-slate-200 hover:shadow-md transition-all duration-300 hover:border-emerald-300"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{prayer.icon}</span>
                                <div>
                                    <h4 className="font-semibold text-slate-800">{prayer.name}</h4>
                                    <p className="text-sm text-slate-500">Prayer time</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-lg font-bold text-emerald-600">{prayer.time}</p>
                                <p className="text-xs text-slate-400">Local time</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="py-6">
                <div className="bg-slate-50 rounded-lg p-4 border border-slate-200">
                    <div className="flex items-center gap-2 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-500"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" /></svg>
                        <h4 className="font-semibold text-slate-700">Location</h4>
                    </div>
                    <p className="text-slate-600 text-sm">Jakarta, Indonesia</p>
                    <p className="text-slate-500 text-xs mt-1">Update your location in settings</p>
                </div>
            </div>
        </div>
    )
}
import PrayerTimePage from '@/components/prayer/prayer-time-page'
import Sidebar from '@/components/sidebar'

export default function PrayerPage() {
    return (
        <div className="flex">
            <Sidebar />
            <PrayerTimePage />
        </div>
    )
}

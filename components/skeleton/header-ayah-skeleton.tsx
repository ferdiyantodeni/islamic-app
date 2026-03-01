export default function HeaderAyahSkeleton() {
    return (
        <div className="animate-pulse">
            <div className="h-4 bg-slate-100 rounded w-40 mb-4"></div>
            <div className="flex items-center justify-between bg-slate-100 rounded-xl px-8 py-8">
                <div className="space-y-2 w-full">
                    <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
                </div>
                <div className="h-16 bg-slate-200 rounded w-24"></div>
            </div>
        </div>
    );
}
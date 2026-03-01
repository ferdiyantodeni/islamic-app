export default function AyahSkeleton() {
    return (
        <div className="border-b border-slate-100 py-8 space-y-4 animate-pulse">
            <div className="flex items-center justify-between">
                <div className="h-12 bg-slate-100 rounded w-3/4"></div>
                <div className="h-12 bg-slate-100 rounded w-12"></div>
            </div>
            <div className="space-y-2">
                <div className="h-4 bg-slate-100 rounded w-full"></div>
                <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                <div className="h-4 bg-slate-100 rounded w-4/5"></div>
            </div>
        </div>
    );
}
export default function DoaSkeleton() {
    return (
        <div className="rounded-2xl bg-white border border-slate-100 p-6 animate-pulse">
            <div className="h-4 w-24 bg-slate-100 rounded-full mb-4" />
            <div className="h-5 w-3/4 bg-slate-100 rounded-full mb-3" />
            <div className="h-3 w-full bg-slate-100 rounded-full mb-2" />
            <div className="h-3 w-5/6 bg-slate-100 rounded-full mb-2" />
            <div className="h-3 w-4/6 bg-slate-100 rounded-full" />
        </div>
    )
}

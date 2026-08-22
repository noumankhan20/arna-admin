export default function GlobalLoading() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 rounded-full border-4 border-emerald-100 border-t-emerald-600 animate-spin" />
        </div>
        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Loading portal...</p>
      </div>
    </div>
  );
}

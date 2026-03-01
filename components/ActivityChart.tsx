'use client';

export default function ActivityChart() {
    const days = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
    const values = [40, 60, 30, 90, 75, 45, 65];

    return (
        <article className="w-full bg-zinc-950 dark:bg-black rounded-3xl p-8 mb-24 transition-colors duration-300">
            <h3 className="text-xl font-bold text-white mb-8 tracking-tight">Activity</h3>

            <div className="flex items-end justify-between gap-2 h-40">
                {values.map((val, i) => (
                    <div key={days[i]} className="flex flex-col items-center gap-4 flex-1">
                        <div
                            className={`w-full rounded-t-lg transition-all duration-1000 ${val === 100 ? 'bg-lime-400' : 'bg-lime-600/40'
                                }`}
                            style={{ height: `${val}%` }}
                            aria-label={`${days[i]}: ${val}%`}
                        />
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                            {days[i]}
                        </span>
                    </div>
                ))}
            </div>
        </article>
    );
}

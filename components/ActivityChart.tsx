'use client';

interface ActivityChartProps {
    activityData: number[]; // 7 numbers, counts for Sun to Sat
}

export default function ActivityChart({ activityData = Array(7).fill(0) }: ActivityChartProps) {
    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
    
    // Find the max value to calculate relative heights (min 1 to avoid division by zero)
    const maxVal = Math.max(...activityData, 1);

    return (
        <article className="w-full bg-zinc-950 dark:bg-black rounded-3xl p-8 mb-24 transition-colors duration-300">
            <h3 className="text-xl font-bold text-white mb-8 tracking-tight">Activity</h3>

            <div className="flex items-end justify-between gap-2 h-40">
                {activityData.map((count, i) => {
                    // Calculate percentage height relative to the max count in the week
                    const percentageHeight = Math.max(5, (count / maxVal) * 100);
                    
                    return (
                        <div key={days[i]} className="flex flex-col items-center gap-4 flex-1 h-full">
                            <div className="relative flex-1 w-full flex items-end">
                                <div
                                    className={`w-full rounded-t-lg transition-all duration-1000 ${
                                        count > 0 ? 'bg-lime-400' : 'bg-zinc-800/40'
                                    }`}
                                    style={{ height: `${percentageHeight}%` }}
                                    aria-label={`${days[i]}: ${count} completions`}
                                />
                            </div>
                            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">
                                {days[i]}
                            </span>
                        </div>
                    );
                })}
            </div>
        </article>
    );
}

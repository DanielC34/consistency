'use client';

export default function MomentumCard() {
    return (
        <section className="w-full bg-gradient-to-br from-lime-400 to-lime-500 dark:from-lime-500 dark:to-lime-600 rounded-3xl p-8 text-zinc-900 dark:text-zinc-950 shadow-lg shadow-lime-200/50 dark:shadow-none mb-8 transition-colors duration-300">
            <div className="flex flex-col gap-4">
                <h2 className="text-sm font-bold tracking-widest uppercase opacity-70">Weekly Momentum</h2>

                <div className="flex items-center gap-4">
                    <span className="text-6xl font-black tracking-tighter">85%</span>
                    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="opacity-80">
                        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
                        <polyline points="16 7 22 7 22 13" />
                    </svg>
                </div>

                <p className="text-lg leading-snug font-medium opacity-80 max-w-[200px]">
                    You&apos;re crushing it! 3 more days to hit your weekly goal.
                </p>
            </div>
        </section>
    );
}

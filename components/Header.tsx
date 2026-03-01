'use client';

import ThemeToggle from "./ThemeToggle";

export default function Header() {
    return (
        <header className="w-full max-w-[480px] flex justify-between items-center p-6 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md sticky top-0 z-20 border-b border-zinc-100 dark:border-zinc-900 transition-colors duration-300">
            <div className="flex items-center gap-4">
                <button className="p-1 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-md transition-colors" aria-label="Menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600 dark:text-zinc-400">
                        <line x1="4" x2="20" y1="12" y2="12" />
                        <line x1="4" x2="20" y1="6" y2="6" />
                        <line x1="4" x2="20" y1="18" y2="18" />
                    </svg>
                </button>
            </div>

            <h1 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Momentum</h1>

            <div className="flex items-center gap-2">
                <ThemeToggle />
                <div className="w-10 h-10 rounded-full bg-lime-100 dark:bg-lime-900/30 flex items-center justify-center border border-lime-200 dark:border-lime-800/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-lime-600 dark:text-lime-400">
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                    </svg>
                </div>
            </div>
        </header>
    );
}

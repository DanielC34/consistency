'use client';

import React, { useState } from 'react';

interface HabitCardProps {
    id: string;
    name: string;
    identityTag: string;
    streak: number;
    weeklyProgress: number; // 0 to 100
    isCompletedToday: boolean;
    onUpdate: () => void;
}

export default function HabitCard({
    id,
    name,
    identityTag,
    streak,
    weeklyProgress,
    isCompletedToday,
    onUpdate,
}: HabitCardProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleComplete = async () => {
        if (isCompletedToday || isSubmitting) return;

        setIsSubmitting(true);
        try {
            const response = await fetch(`/api/habits/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                onUpdate();
            }
        } catch (error) {
            console.error('Failed to mark habit as complete:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="group relative w-full bg-white dark:bg-zinc-900/50 border border-zinc-100 dark:border-zinc-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition-all duration-300 mb-4">
            <div className="flex justify-between items-start">
                <div className="space-y-2">
                    {/* Identity Tag */}
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-[10px] font-bold text-zinc-500 dark:text-zinc-400 tracking-wider">
                        {identityTag.toUpperCase()}
                    </span>

                    <h3 className="text-xl font-bold text-zinc-900 dark:text-zinc-50 tracking-tight">
                        {name}
                    </h3>

                    {/* Streak */}
                    <div className="flex items-center gap-1.5 bg-orange-50 dark:bg-orange-950/20 w-fit px-2 py-1 rounded-lg">
                        <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-orange-500 fill-orange-500"
                        >
                            <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
                        </svg>
                        <span className="text-xs font-bold text-orange-600 dark:text-orange-400">
                            {streak} day streak
                        </span>
                    </div>
                </div>

                {/* Circular Progress (conic-gradient) */}
                <div
                    className="relative flex items-center justify-center h-16 w-16 rounded-full bg-zinc-100 dark:bg-zinc-800 transition-all duration-1000 ease-in-out"
                    style={{
                        backgroundImage: `conic-gradient(#a3e635 ${weeklyProgress}%, transparent 0%)`,
                    }}
                >
                    {/* Inner circle to create doughnut effect */}
                    <div className="absolute inset-1 bg-white dark:bg-zinc-900 rounded-full flex items-center justify-center">
                        <span className="text-[11px] font-black text-zinc-900 dark:text-zinc-50">
                            {weeklyProgress}%
                        </span>
                    </div>
                </div>
            </div>

            <div className="mt-5 flex gap-2">
                <button
                    onClick={handleComplete}
                    disabled={isCompletedToday || isSubmitting}
                    className={`flex-1 flex items-center justify-center gap-2 font-bold py-3 rounded-2xl transition-all active:scale-[0.98] shadow-sm ${
                        isCompletedToday
                            ? 'bg-zinc-100 dark:bg-zinc-800 text-zinc-400 dark:text-zinc-600 cursor-default'
                            : 'bg-lime-400 hover:bg-lime-500 text-zinc-950'
                    }`}
                >
                    {isSubmitting ? (
                        <svg
                            className="animate-spin h-5 w-5"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                    ) : isCompletedToday ? (
                        <>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Done Today
                        </>
                    ) : (
                        'Mark Done'
                    )}
                </button>
                <button className="p-3 bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors">
                    <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-zinc-400"
                    >
                        <circle cx="12" cy="12" r="1" />
                        <circle cx="19" cy="12" r="1" />
                        <circle cx="5" cy="12" r="1" />
                    </svg>
                </button>
            </div>
        </div>
    );
}
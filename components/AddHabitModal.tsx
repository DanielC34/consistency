'use client';

import React, { useState } from 'react';

interface AddHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AddHabitModal({ isOpen, onClose }: AddHabitModalProps) {
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('Athlete');
    const [target, setTarget] = useState(5);

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Logic for saving would go here
        console.log({ name, identity, target });
        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4 bg-zinc-900/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div
                className="w-full max-w-[480px] bg-white dark:bg-zinc-950 rounded-t-[32px] sm:rounded-[32px] p-8 shadow-2xl border border-zinc-100 dark:border-zinc-800 animate-in slide-in-from-bottom-8 duration-500"
                role="dialog"
                aria-modal="true"
            >
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">New Habit</h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors"
                        aria-label="Close modal"
                    >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-400">
                            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <label htmlFor="habit-name" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-1">
                            Habit Name
                        </label>
                        <input
                            id="habit-name"
                            type="text"
                            required
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Daily Reading"
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600"
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="identity-tag" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-1">
                            Identity Tag
                        </label>
                        <select
                            id="identity-tag"
                            value={identity}
                            onChange={(e) => setIdentity(e.target.value)}
                            className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-4 text-zinc-900 dark:text-zinc-50 focus:outline-none focus:ring-2 focus:ring-lime-500 appearance-none transition-all"
                        >
                            {['Athlete', 'Builder', 'Reader', 'Creator', 'Spiritual'].map((tag) => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="weekly-goal" className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-1">
                            Weekly Goal
                        </label>
                        <div className="flex items-center bg-zinc-50 dark:bg-zinc-900 border border-zinc-100 dark:border-zinc-800 rounded-2xl p-2 gap-4">
                            <button
                                type="button"
                                onClick={() => setTarget(Math.max(1, target - 1))}
                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 text-zinc-900 dark:text-zinc-50 font-bold active:scale-95 transition-all"
                            >
                                -
                            </button>
                            <div className="flex-1 text-center">
                                <span className="text-xl font-bold text-zinc-900 dark:text-zinc-50">{target}</span>
                                <span className="block text-[10px] font-bold text-zinc-400 uppercase">Days / Week</span>
                            </div>
                            <button
                                type="button"
                                onClick={() => setTarget(Math.min(7, target + 1))}
                                className="w-12 h-12 flex items-center justify-center rounded-xl bg-lime-400 text-zinc-950 font-bold shadow-sm active:scale-95 transition-all"
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            className="w-full bg-lime-400 hover:bg-lime-500 text-zinc-950 font-bold py-4 rounded-2xl shadow-lg shadow-lime-300/30 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="20 6 9 17 4 12" />
                            </svg>
                            Save Habit
                        </button>
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full bg-transparent hover:bg-zinc-50 dark:hover:bg-zinc-900 text-zinc-500 dark:text-zinc-400 font-bold py-4 rounded-2xl transition-all"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

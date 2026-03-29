'use client';

import React, { useState } from 'react';
import { habitTemplates } from '@/features/habits/utils/templates';

interface AddHabitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onHabitCreated: () => void;
}

export default function AddHabitModal({ isOpen, onClose, onHabitCreated }: AddHabitModalProps) {
    const [name, setName] = useState('');
    const [identity, setIdentity] = useState('Athlete');
    const [target, setTarget] = useState(5);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);

    if (!isOpen) return null;

    const handleTemplateSelect = (templateName: string) => {
        const template = habitTemplates.find(t => t.name === templateName);
        if (template) {
            setName(template.name);
            setIdentity(template.identityTag);
            setTarget(template.weeklyTarget);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!name.trim()) {
            setError('Please enter a habit name.');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await fetch('/api/habits', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name,
                    identityTag: identity,
                    targetPerWeek: target,
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Failed to create habit');
            }

            // Success
            setName('');
            setIdentity('Athlete');
            setTarget(5);
            onHabitCreated();
            onClose();
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
            setIsSubmitting(false);
        }
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
                    {/* Template Selector */}
                    <div className="space-y-3">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-zinc-500 dark:text-zinc-400 px-1">
                            Quick Templates
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                            {habitTemplates.map((template) => (
                                <button
                                    key={template.name}
                                    type="button"
                                    onClick={() => handleTemplateSelect(template.name)}
                                    className={`py-2 px-3 rounded-xl text-xs font-bold transition-all border ${
                                        name === template.name
                                            ? 'bg-lime-400 border-lime-400 text-zinc-950'
                                            : 'bg-zinc-50 dark:bg-zinc-900 border-zinc-100 dark:border-zinc-800 text-zinc-600 dark:text-zinc-400 hover:border-zinc-300 dark:hover:border-zinc-700'
                                    }`}
                                >
                                    {template.name}
                                </button>
                            ))}
                        </div>
                    </div>

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
                            {['Athlete', 'Builder', 'Reader', 'Creator', 'Spiritual', 'Mindful', 'Learner'].map((tag) => (
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

                    {error && (
                        <div className="bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-2xl text-sm font-medium animate-in fade-in slide-in-from-top-2 duration-300">
                            {error}
                        </div>
                    )}

                    <div className="flex flex-col gap-3 pt-4">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full bg-lime-400 hover:bg-lime-500 disabled:opacity-50 disabled:cursor-not-allowed text-zinc-950 font-bold py-4 rounded-2xl shadow-lg shadow-lime-300/30 dark:shadow-none transition-all active:scale-[0.98] flex items-center justify-center gap-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <svg className="animate-spin h-5 w-5 text-zinc-950" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Save Habit
                                </>
                            )}
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

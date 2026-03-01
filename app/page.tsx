'use client';

import { useState, useEffect } from 'react';
import MomentumCard from "@/components/MomentumCard";
import HabitCard from "@/components/HabitCard";
import ActivityChart from "@/components/ActivityChart";
import FloatingActionButton from "@/components/FloatingActionButton";
import AddHabitModal from "@/components/AddHabitModal";
import { IHabit } from '@/types/habit';

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [habits, setHabits] = useState<IHabit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchHabits = async () => {
    try {
      setError(null);
      const response = await fetch('/api/habits');
      if (!response.ok) {
        throw new Error('Failed to fetch habits');
      }
      const data = await response.json();
      setHabits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const getStartOfWeek = (date: Date) => {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    const start = new Date(d.setDate(diff));
    start.setHours(0, 0, 0, 0);
    return start;
  };

  const calculateStreak = (logs: { date: string; completed: boolean }[] = []) => {
    if (!logs.length) return 0;

    // Sort logs by date descending
    const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));

    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];

    let streak = 0;
    let expectedDate = today;

    // If today is not in logs and yesterday is not in logs, streak is 0
    const hasToday = sortedLogs.some(l => l.date === today && l.completed);
    const hasYesterday = sortedLogs.some(l => l.date === yesterday && l.completed);

    if (!hasToday && !hasYesterday) return 0;

    // Start from today if it exists, otherwise start from yesterday
    if (!hasToday) {
      expectedDate = yesterday;
    }

    for (const log of sortedLogs) {
      if (log.date === expectedDate && log.completed) {
        streak++;
        // Move expected date back by 1 day
        const d = new Date(expectedDate);
        d.setDate(d.getDate() - 1);
        expectedDate = d.toISOString().split('T')[0];
      } else if (log.date < expectedDate) {
        // Gap found
        break;
      }
    }

    return streak;
  };

  const calculateWeeklyProgress = (logs: { date: string; completed: boolean }[] = [], target: number) => {
    if (!logs.length || target === 0) return 0;

    const startOfWeek = getStartOfWeek(new Date());
    const weekStartStr = startOfWeek.toISOString().split('T')[0];

    const completionsThisWeek = logs.filter(log =>
      log.completed && log.date >= weekStartStr
    ).length;

    return Math.min(100, Math.round((completionsThisWeek / target) * 100));
  };

  const calculateGlobalMomentum = (habits: IHabit[]) => {
    if (!habits.length) return { percentage: 0, daysToGoal: 0 };

    const startOfWeek = getStartOfWeek(new Date());
    const weekStartStr = startOfWeek.toISOString().split('T')[0];

    let totalCompletions = 0;
    let totalTarget = 0;

    habits.forEach(habit => {
      const completions = habit.logs?.filter(log =>
        log.completed && log.date >= weekStartStr
      ).length || 0;

      totalCompletions += completions;
      totalTarget += habit.targetPerWeek;
    });

    const percentage = totalTarget > 0 ? Math.round((totalCompletions / totalTarget) * 100) : 0;
    const daysToGoal = Math.max(0, totalTarget - totalCompletions);

    return { percentage, daysToGoal };
  };

  const { percentage: momentumScore, daysToGoal } = calculateGlobalMomentum(habits);

  return (
    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <MomentumCard percentage={momentumScore} daysToGoal={daysToGoal} />

      <section className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Your Habits</h2>
          <button className="text-sm font-bold text-lime-600 dark:text-lime-400 hover:opacity-80 transition-opacity">
            View All
          </button>
        </div>

        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex flex-col gap-4 animate-pulse">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-24 bg-zinc-100 dark:bg-zinc-900 rounded-3xl" />
              ))}
            </div>
          ) : error ? (
            <div className="p-8 bg-red-50 dark:bg-red-900/20 rounded-3xl text-center">
              <p className="text-red-600 dark:text-red-400 font-medium mb-4">{error}</p>
              <button
                onClick={fetchHabits}
                className="text-sm font-bold text-red-600 dark:text-red-400 underline underline-offset-4"
              >
                Try Again
              </button>
            </div>
          ) : habits.length === 0 ? (
            <div className="p-12 border-2 border-dashed border-zinc-200 dark:border-zinc-800 rounded-[32px] text-center">
              <p className="text-zinc-500 dark:text-zinc-400 font-medium">No habits yet. Let&apos;s build some momentum!</p>
            </div>
          ) : (
            habits.map((habit) => {
              const today = new Date().toISOString().split('T')[0];
              const isCompletedToday = habit.logs?.some(l => l.date === today && l.completed) || false;
              const streak = calculateStreak(habit.logs);
              const weeklyProgress = calculateWeeklyProgress(habit.logs, habit.targetPerWeek);

              return (
                <HabitCard
                  key={habit._id}
                  id={habit._id!}
                  name={habit.name}
                  identityTag={habit.identityTag}
                  streak={streak}
                  weeklyProgress={weeklyProgress}
                  isCompletedToday={isCompletedToday}
                  onUpdate={fetchHabits}
                />
              );
            })
          )}
        </div>
      </section>

      <ActivityChart />

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitCreated={fetchHabits}
      />
    </div>
  );
}

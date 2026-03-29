'use client';

import { useState, useEffect } from 'react';
import MomentumCard from "@/components/MomentumCard";
import HabitCard from "@/features/habits/components/HabitCard";
import ActivityChart from "@/components/ActivityChart";
import FloatingActionButton from "@/components/FloatingActionButton";
import AddHabitModal from "@/components/AddHabitModal";
import { IHabit } from '@/types/habit';
import { getLocalDayString, getStartOfSundayWeek } from '@/features/habits/utils/date-utils';

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

  // Memoize date calculations to ensure consistency across all sub-components and loops
  const startOfWeek = getStartOfSundayWeek();
  const weekStartStr = getLocalDayString(startOfWeek);
  const today = getLocalDayString();

  const calculateStreak = (logs: { date: string; completed: boolean }[] = []) => {
    if (!logs.length) return 0;
    const sortedLogs = [...logs].sort((a, b) => b.date.localeCompare(a.date));
    
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = getLocalDayString(yesterdayDate);

    let streak = 0;
    let expectedDate = today;

    const hasToday = sortedLogs.some(l => l.date === today && l.completed);
    const hasYesterday = sortedLogs.some(l => l.date === yesterday && l.completed);

    if (!hasToday && !hasYesterday) return 0;
    if (!hasToday) expectedDate = yesterday;

    for (const log of sortedLogs) {
      if (log.date === expectedDate && log.completed) {
        streak++;
        const d = new Date(expectedDate);
        d.setDate(d.getDate() - 1);
        expectedDate = getLocalDayString(d);
      } else if (log.date < expectedDate) {
        break;
      }
    }
    return streak;
  };

  const calculateWeeklyProgress = (logs: { date: string; completed: boolean }[] = [], target: number) => {
    if (!logs.length || target === 0) return 0;
    const completionsThisWeek = logs.filter(log => log.completed && log.date >= weekStartStr).length;
    return Math.min(100, Math.round((completionsThisWeek / target) * 100));
  };

  const calculateGlobalMomentum = (habits: IHabit[]) => {
    if (!habits.length) return { percentage: 0, daysToGoal: 0 };
    let totalCompletions = 0;
    let totalTarget = 0;

    habits.forEach(habit => {
      const completions = habit.logs?.filter(log => log.completed && log.date >= weekStartStr).length || 0;
      totalCompletions += completions;
      totalTarget += habit.targetPerWeek;
    });

    const percentage = totalTarget > 0 ? Math.round((totalCompletions / totalTarget) * 100) : 0;
    const daysToGoal = Math.max(0, totalTarget - totalCompletions);
    return { percentage, daysToGoal };
  };

  const calculateDailyActivity = (habits: IHabit[]) => {
    const activity = Array(7).fill(0);
    habits.forEach(habit => {
      habit.logs?.forEach(log => {
        if (!log.completed) return;
        for (let i = 0; i < 7; i++) {
          const checkDate = new Date(startOfWeek);
          checkDate.setDate(startOfWeek.getDate() + i);
          if (log.date === getLocalDayString(checkDate)) {
            activity[i]++;
            break;
          }
        }
      });
    });
    return activity;
  };

  const { percentage: momentumScore, daysToGoal } = calculateGlobalMomentum(habits);
  const dailyActivity = calculateDailyActivity(habits);

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
              const today = getLocalDayString();
              console.log('[Audit] Frontend Today:', today, 'Current Time:', new Date().toLocaleString());
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
                  weeklyBreakdown={habit.weeklyBreakdown}
                  onUpdate={fetchHabits}
                />
              );
            })
          )}
        </div>
      </section>

      <ActivityChart activityData={dailyActivity} />

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitCreated={fetchHabits}
      />
    </div>
  );
}

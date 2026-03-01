'use client';

import { useState } from 'react';
import MomentumCard from "@/components/MomentumCard";
import HabitCard from "@/components/HabitCard";
import ActivityChart from "@/components/ActivityChart";
import FloatingActionButton from "@/components/FloatingActionButton";
import AddHabitModal from "@/components/AddHabitModal";

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const habits = [
    {
      name: "Morning Run",
      identityTag: "Athlete",
      streak: 12,
      weeklyProgress: 75,
      onComplete: () => console.log("Morning Run complete"),
    },
    {
      name: "Read 20 Pages",
      identityTag: "Reader",
      streak: 4,
      weeklyProgress: 45,
      onComplete: () => console.log("Read 20 Pages complete"),
    },
  ];

  return (
    <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <MomentumCard />

      <section className="flex flex-col gap-6 mb-8">
        <div className="flex justify-between items-end">
          <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Your Habits</h2>
          <button className="text-sm font-bold text-lime-600 dark:text-lime-400 hover:opacity-80 transition-opacity">
            View All
          </button>
        </div>

        <div className="flex flex-col">
          {habits.map((habit) => (
            <HabitCard key={habit.name} {...habit} />
          ))}
        </div>
      </section>

      <ActivityChart />

      <FloatingActionButton onClick={() => setIsModalOpen(true)} />

      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

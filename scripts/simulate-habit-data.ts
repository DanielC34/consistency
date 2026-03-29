import connectDB from '../lib/db';
import Habit from '../lib/models/Habit';
import { getLocalDayString } from '../features/habits/utils/date-utils';

async function simulate() {
  await connectDB();
  
  // Find the 'Meditation' habit or 'Read' habit
  const habit = await Habit.findOne({ name: 'Meditation' }) || await Habit.findOne({ name: 'Read' });
  
  if (!habit) {
    console.error('No habit found to simulate on.');
    process.exit(1);
  }

  console.log(`Simulating on habit: ${habit.name}`);

  // 1. Add log for "Last Saturday" (March 28) - Should be HIDDEN in current week
  const lastSaturday = "2026-03-28";
  if (!habit.logs.some(l => l.date === lastSaturday)) {
    habit.logs.push({ date: lastSaturday, completed: true });
    console.log(`Added log for ${lastSaturday} (Last Week)`);
  }

  // 2. Add log for "Next Saturday" (April 4) - Should be VISIBLE in current week (index 6)
  const nextSaturday = "2026-04-04";
  if (!habit.logs.some(l => l.date === nextSaturday)) {
    habit.logs.push({ date: nextSaturday, completed: true });
    console.log(`Added log for ${nextSaturday} (This Week)`);
  }

  await habit.save();
  console.log('Simulation logs saved.');
  process.exit(0);
}

simulate();

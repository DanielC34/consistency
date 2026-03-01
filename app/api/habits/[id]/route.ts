import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Habit from '@/lib/models/Habit';

/**
 * PATCH: Log a habit completion for today.
 * prevents duplicate logs for the same day.
 */
export async function PATCH(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params;
        await connectDB();

        const habit = await Habit.findById(id);

        if (!habit) {
            return NextResponse.json(
                { error: 'Habit not found' },
                { status: 404 }
            );
        }

        // Get today's date in YYYY-MM-DD format
        const today = new Date().toISOString().split('T')[0];

        // Check if log already exists for today
        const alreadyLogged = habit.logs.some(log => log.date === today);

        if (!alreadyLogged) {
            habit.logs.push({
                date: today,
                completed: true
            });
            await habit.save();
        }

        return NextResponse.json(habit);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.error('PATCH /api/habits/[id] error:', error);
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

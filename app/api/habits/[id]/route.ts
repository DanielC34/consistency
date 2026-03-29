import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Habit from '@/lib/models/Habit';
import { getLocalDayString, getStartOfSundayWeek } from '@/features/habits/utils/date-utils';

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

        // Get today's date in YYYY-MM-DD format (Local Time)
        const now = new Date();
        console.log('[Audit] PATCH /api/habits/[id] - Server Time:', now.toLocaleString(), 'UTC:', now.toISOString());
        
        const todayStr = getLocalDayString(now);

        // Check if log already exists for today
        const alreadyLogged = habit.logs.some((log: any) => log.date === todayStr);

        if (alreadyLogged) {
            return NextResponse.json(
                { error: 'Habit already completed for today' },
                { status: 409 }
            );
        }

        habit.logs.push({
            date: todayStr,
            completed: true
        });
        await habit.save();

        // Calculate weekly breakdown for the habit (Sunday to Saturday)
        const startOfWeek = getStartOfSundayWeek(now);

        const breakdown = Array(7).fill(false);
        const logs = habit.logs || [];
        
        for (let i = 0; i < 7; i++) {
            const checkDate = new Date(startOfWeek);
            checkDate.setDate(startOfWeek.getDate() + i);
            const checkDateStr = getLocalDayString(checkDate);
            
            breakdown[i] = logs.some((log: any) => log.date === checkDateStr && log.completed);
        }

        return NextResponse.json({
            ...habit.toObject(),
            weeklyBreakdown: breakdown
        });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.error('PATCH /api/habits/[id] error:', error);
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

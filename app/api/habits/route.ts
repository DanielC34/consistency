import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Habit from '@/lib/models/Habit';
import { getLocalDayString, getStartOfSundayWeek } from '@/features/habits/utils/date-utils';

/**
 * GET: Retrieve all habits from the database.
 * Includes a weeklyBreakdown (7 booleans, Sun-Sat) for each habit.
 */
export async function GET() {
    try {
        await connectDB();
        const habits = await Habit.find({}).sort({ createdAt: -1 });
        
        // Calculate weekly breakdown for each habit (Sunday to Saturday)
        const now = new Date();
        console.log('[Audit] GET /api/habits - Server Time:', now.toLocaleString(), 'UTC:', now.toISOString());
        
        const startOfWeek = getStartOfSundayWeek(now);

        const habitsWithBreakdown = habits.map((habit: any) => {
            const breakdown = Array(7).fill(false);
            const logs = habit.logs || [];
            
            for (let i = 0; i < 7; i++) {
                const checkDate = new Date(startOfWeek);
                checkDate.setDate(startOfWeek.getDate() + i);
                const checkDateStr = getLocalDayString(checkDate);
                
                breakdown[i] = logs.some((log: any) => log.date === checkDateStr && log.completed);
            }
            
            return {
                ...habit.toObject(),
                weeklyBreakdown: breakdown
            };
        });

        return NextResponse.json(habitsWithBreakdown);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.error('GET /api/habits error:', error);
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

/**
 * POST: Create a new habit.
 * Requires name and identityTag in the request body.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();

        // Basic validation
        if (!body.name || !body.identityTag) {
            return NextResponse.json(
                { error: 'Missing required fields: name, identityTag' },
                { status: 400 }
            );
        }

        await connectDB();
        const habit = await Habit.create(body);

        return NextResponse.json(habit, { status: 201 });
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Internal Server Error';
        console.error('POST /api/habits error:', error);
        return NextResponse.json(
            { error: message },
            { status: 500 }
        );
    }
}

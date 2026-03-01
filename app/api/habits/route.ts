import { NextResponse } from 'next/server';
import connectDB from '@/lib/db';
import Habit from '@/lib/models/Habit';

/**
 * GET: Retrieve all habits from the database.
 * Sorted by createdAt in descending order.
 */
export async function GET() {
    try {
        await connectDB();
        const habits = await Habit.find({}).sort({ createdAt: -1 });
        return NextResponse.json(habits);
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

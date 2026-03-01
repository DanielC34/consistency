import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ILog {
    date: string; // ISO format YYYY-MM-DD
    completed: boolean;
}

export interface IHabit extends Document {
    name: string;
    identityTag: string;
    targetPerWeek: number;
    logs: ILog[];
    createdAt: Date;
}

const LogSchema = new Schema<ILog>({
    date: { type: String, required: true },
    completed: { type: Boolean, required: true },
}, { _id: false });

const HabitSchema = new Schema<IHabit>({
    name: { type: String, required: true },
    identityTag: { type: String, required: true },
    targetPerWeek: { type: Number, default: 7 },
    logs: [LogSchema],
    createdAt: { type: Date, default: Date.now },
});

// Avoid recompiling model in development
const Habit: Model<IHabit> = mongoose.models.Habit || mongoose.model<IHabit>('Habit', HabitSchema);

export default Habit;

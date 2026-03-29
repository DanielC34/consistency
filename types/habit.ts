export interface IHabit {
    _id?: string;
    name: string;
    identityTag: string;
    targetPerWeek: number;
    streak?: number;
    weeklyProgress?: number;
    weeklyBreakdown?: boolean[];
    logs?: { date: string; completed: boolean }[];
    createdAt?: Date;
}

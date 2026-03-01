export interface IHabit {
    _id?: string;
    name: string;
    identityTag: string;
    targetPerWeek: number;
    streak?: number;
    weeklyProgress?: number;
    logs?: { date: string; completed: boolean }[];
    createdAt?: string;
}

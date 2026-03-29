export interface HabitTemplate {
  name: string;
  identityTag: string;
  weeklyTarget: number;
}

export const habitTemplates: HabitTemplate[] = [
  { name: "Gym", identityTag: "Athlete", weeklyTarget: 3 },
  { name: "Meditation", identityTag: "Mindful", weeklyTarget: 7 },
  { name: "Read", identityTag: "Learner", weeklyTarget: 5 },
];

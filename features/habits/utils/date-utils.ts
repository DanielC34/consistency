/**
 * Returns today's date in YYYY-MM-DD format based on the local timezone.
 */
export const getLocalDayString = (date: Date = new Date()) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Returns the 0-6 day index for today (0 is Sunday, 6 is Saturday).
 */
export const getCurrentDayIndex = (date: Date = new Date()) => {
  return date.getDay();
};

/**
 * Returns the Sunday of the current week (00:00:00) in the local timezone.
 */
export const getStartOfSundayWeek = (date: Date = new Date()) => {
  const d = new Date(date);
  const day = d.getDay();
  // Set to Sunday of the current week
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d;
};

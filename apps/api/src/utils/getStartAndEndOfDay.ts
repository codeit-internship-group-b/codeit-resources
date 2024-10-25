export const getStartAndEndOfDay = (date: Date): { startOfDay: Date; endOfDay: Date } => {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);
  return { startOfDay, endOfDay };
};

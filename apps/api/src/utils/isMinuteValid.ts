export const isMinuteValid = (date: Date): boolean => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    return false;
  }
  const minutes = date.getMinutes();

  return minutes % 10 === 0;
};

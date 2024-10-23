export const isTimeInTenMinuteIntervals = (date: Date): boolean => {
  const minutes = date.getMinutes();
  return minutes % 10 === 0;
};

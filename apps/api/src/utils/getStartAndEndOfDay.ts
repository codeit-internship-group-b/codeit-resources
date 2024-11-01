export const getStartAndEndOfDay = (date: Date): { startOfDay: Date; endOfDay: Date } => {
  // 한국 로컬타임 기준으로 설정
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(15, 0, 0, 0); // 시작 시간을 전날 15:00로 설정
  const endOfDay = new Date(date);
  endOfDay.setUTCHours(14, 59, 59, 999); // 종료 시간을 당일 14:59로 설정
  return { startOfDay, endOfDay };
};

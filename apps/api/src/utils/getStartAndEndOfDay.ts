export const getStartAndEndOfDay = (dateString: string): { startOfDay: Date; endOfDay: Date } => {
  // 유저의 로컬 타임존을 자동으로 감지하여 startOfDay와 endOfDay를 UTC 기준으로 설정
  const localStartOfDay = new Date(`${dateString}T00:00:00`);
  const localEndOfDay = new Date(`${dateString}T23:59:59`);

  // 로컬 기준 시간대를 UTC로 변환
  const startOfDayUTC = new Date(localStartOfDay.toISOString());
  const endOfDayUTC = new Date(localEndOfDay.toISOString());

  return { startOfDay: startOfDayUTC, endOfDay: endOfDayUTC };
};

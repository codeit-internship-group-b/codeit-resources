export const isMinuteValid = (date: Date | string): boolean => {
  // 만약 문자열이 전달되었을 경우, Date 객체로 변환
  const parsedDate = typeof date === "string" ? new Date(date) : date;

  // Date 객체인지와 유효한 날짜인지 확인
  if (!(parsedDate instanceof Date) || isNaN(parsedDate.getTime())) {
    return false;
  }

  const minutes = parsedDate.getUTCMinutes();
  return minutes % 10 === 0;
};

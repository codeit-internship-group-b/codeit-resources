export const isValidDateFormat = (dateString: string): boolean => {
  if (typeof dateString !== "string") {
    return false;
  }

  // YYYY-MM-DD 형식을 확인하는 정규식
  const regex = /^\d{4}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])$/;

  if (!regex.test(dateString)) {
    return false;
  }

  // 실제로 유효한 날짜인지 확인
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getUTCDate();

  const [inputYear, inputMonth, inputDay] = dateString.split("-").map(Number);

  return inputYear === year && inputMonth === month && inputDay === day;
};

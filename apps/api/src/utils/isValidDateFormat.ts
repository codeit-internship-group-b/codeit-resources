export default function isValidDateFormat(dateString: string): boolean {
  // YYYY-MM-DD 형식을 확인하는 정규식
  const regex = /^\d{4}-\d{2}-\d{2}$/;

  if (!regex.test(dateString)) {
    return false;
  }

  // 실제로 유효한 날짜인지 확인
  const date = new Date(dateString);
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // 월은 0부터 시작하므로 +1
  const day = date.getUTCDate();

  // 입력값과 재구성된 날짜 값이 일치하는지 확인
  const [inputYear, inputMonth, inputDay] = dateString.split("-").map(Number);

  return inputYear === year && inputMonth === month && inputDay === day;
}

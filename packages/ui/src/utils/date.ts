/**
 * 주어진 연도와 월에 맞는 날짜와 요일을 계산하여 배열로 반환합니다.
 *
 * @param {number} year - 연도
 * @param {number} month - 월 (1월 = 1, 12월 = 12)
 * @param {string} page - 'meetings'일 경우 '28일 (월)' 형식, 그 외는 '10월 28일' 형식
 * @returns {string[]} 계산된 날짜 배열
 */

export function getDatesFromToday(year: number, month: number, page: string): string[] {
  const today = new Date();
  const newDates = [];
  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  const dayCount = page === "meetings" ? 3 : page === "seats" ? 2 : 0;

  for (let i = 0; i < dayCount; i++) {
    const futureDate = new Date(today);
    futureDate.setDate(today.getDate() + i);

    let formattedDate;
    if (page === "meetings") {
      const dayOfWeek = dayNames[futureDate.getDay()];
      formattedDate = `${String(futureDate.getDate())}일 (${String(dayOfWeek)})`;
    } else {
      formattedDate = `${String(futureDate.getMonth() + 1)}월 ${String(futureDate.getDate())}일`;
    }

    newDates.push(formattedDate);
  }

  return newDates;
}

/**
 * 주어진 일수만큼 날짜를 반환합니다.
 *
 * @param {string} page - 날짜 형식을 결정하는 페이지 이름 ('meetings'이면 28일 (월) 형식, 아니면 10월 28일 형식)
 * @returns {string[]} 계산된 날짜 배열
 */

export function getDatesFromToday(page: string): string[] {
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

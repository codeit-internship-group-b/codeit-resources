import { dayNames } from "@ui/src/utils/constants/dayNames";

/**
 * 주어진 연도와 월에 맞는 날짜를 계산하여 배열로 반환합니다.
 * 날짜는 `Date` 객체로 반환됩니다.
 *
 * @param {number} year - 연도 (예: 2024)
 * @param {number} month - 월 (1월 = 1, 12월 = 12)
 * @param {number} dayCount - 반환할 날짜의 수 (예: 3일, 2일)
 * @returns {Date[]} 계산된 날짜 배열
 */
export const getDatesFromToday = (year: number, month: number, dayCount: number): Date[] => {
  const dates: Date[] = [];

  for (let i = 0; i < dayCount; i++) {
    const futureDate = new Date(year, month - 1, new Date().getDate() + i); // 해당 연도와 월에 맞게 날짜 설정
    dates.push(futureDate);
  }

  return dates;
};

/**
 * 현재 월에 맞는 날짜를 계산하여 배열로 반환합니다.
 * 날짜는 `Date` 객체로 반환됩니다.
 *
 * @param {number} dayCount - 반환할 날짜의 수 (예: 3일, 2일)
 * @returns {Date[]} 계산된 날짜 배열
 */
export const getDatesForSeats = (dayCount: number): Date[] => {
  const today = new Date();
  const dates: Date[] = [];

  for (let i = 0; i < dayCount; i++) {
    const futureDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i); // 오늘 날짜를 기준으로 계산
    dates.push(futureDate);
  }

  return dates;
};

/**
 * Date 객체를 포맷팅된 문자열로 변환합니다.
 *
 * @param {Date} date - 포맷팅할 날짜
 * @param {string} page - 'meetings'일 경우 '28일 (월)' 형식, 그 외는 '10월 28일' 형식
 * @returns {string} 포맷팅된 날짜 문자열
 */
export const formatDate = (date: Date, page: string): string => {
  if (page === "meetings") {
    const dayOfWeek = dayNames[date.getDay()];
    return `${date.getDate()}일 (${dayOfWeek})`;
  } else {
    return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
  }
};

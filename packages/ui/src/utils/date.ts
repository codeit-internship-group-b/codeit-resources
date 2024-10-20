import { DAY_NAMES } from "@ui/src/utils/constants/dayNames";

/**
 * 주어진 연도와 월에 맞는 날짜를 계산하여 배열로 반환합니다.
 * 날짜는 `Date` 객체로 반환됩니다.
 *
 * @param year - 연도 (예: 2024)
 * @param month - 월 (1월 = 1, 12월 = 12)
 * @param dayCount - 반환할 날짜의 수 (예: 3일, 2일)
 * @returns 계산된 날짜 배열
 */
export const getDatesFromToday = (year: number, month: number, dayCount: number): Date[] => {
  const dates: Date[] = [];
  const startDate = new Date(year, month - 1, new Date().getDate());

  for (let i = 0; i < dayCount; i++) {
    const futureDate = new Date(startDate);
    futureDate.setDate(startDate.getDate() + i);
    dates.push(futureDate);
  }

  return dates;
};

/**
 * 현재 월에 맞는 날짜를 계산하여 배열로 반환합니다.
 * 날짜는 `Date` 객체로 반환됩니다.
 *
 * @param dayCount - 반환할 날짜의 수 (예: 3일, 2일)
 * @returns 계산된 날짜 배열
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
 * @param date - 포맷팅할 날짜
 * @param page - 'meetings'일 경우 '28일 (월)' 형식, 그 외는 '10월 28일' 형식
 * @returns 포맷팅된 날짜 문자열
 */
export const formatDate = (date: Date, page: string): string => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error("유효하지 않은 날짜 객체입니다.");
  }

  if (page === "meetings") {
    const dayOfWeek = DAY_NAMES[date.getDay()];
    return `${date.getDate()}일 (${dayOfWeek})`;
  } else {
    return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
  }
};

/**
 * 주어진 연도, 월, 일 객체를 YYYY-MM-DD 형식의 문자열로 포맷팅합니다.
 *
 * @param date - 연도(year), 월(month), 일(day)을 포함하는 객체
 *   @property year - 연도 (예: 2024)
 *   @property month - 월 (1월 = 1, 12월 = 12)
 *   @property day - 일 (1일부터 31일까지의 값)
 * @returns {string} YYYY-MM-DD 형식으로 포맷팅된 날짜 문자열
 */
export const formatSelectedDate = (date: { year: number; month: number; day: number }): string => {
  return `${String(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
};

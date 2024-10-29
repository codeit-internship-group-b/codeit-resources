/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { DAY_NAMES } from "@ui/src/utils/constants/dayNames";

/**
 * 오늘 날짜로부터 해당 월의 마지막 날까지의 날짜를 계산하여 배열로 반환합니다.
 * 날짜는 `Date` 객체로 반환됩니다.
 * 주어진 연도와 월이 오늘 날짜보다 과거일 경우 빈 배열을 반환합니다.
 *
 * @param year - 연도 (예: 2024)
 * @param month - 월 (1월 = 1, 12월 = 12)
 * @returns 오늘 날짜부터 해당 월의 마지막 날까지의 날짜 배열, 또는 빈 배열
 */
export const getDatesFromTodayToEndOfMonth = (year: number, month: number): Date[] => {
  const dates: Date[] = [];

  // 오늘 날짜 구하기
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;
  const currentDay = today.getDate();

  if (year < currentYear || (year === currentYear && month < currentMonth)) {
    return [];
  }

  const startDay = year === currentYear && month === currentMonth ? currentDay : 1;

  if (month < 1 || month > 12) {
    throw new Error("Invalid month. Please provide a month between 1 and 12.");
  }

  const endDate = new Date(year, month, 0);
  const lastDayOfMonth = endDate.getDate();

  for (let day = startDay; day <= lastDayOfMonth; day++) {
    dates.push(new Date(year, month - 1, day));
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
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) {
    throw new Error("유효하지 않은 날짜 객체입니다.");
  }

  if (page === "meetings") {
    const dayOfWeek = DAY_NAMES[date.getDay()];
    return `${date.getDate()}일 (${dayOfWeek})`;
  }
  return `${String(date.getMonth() + 1)}월 ${String(date.getDate())}일`;
};

/**
 * 주어진 연도, 월, 일 객체를 YYYY-MM-DD 형식의 문자열로 포맷팅합니다.
 *
 * @param date - 연도(year), 월(month), 일(day)을 포함하는 객체
 * @returns YYYY-MM-DD 형식으로 포맷팅된 날짜 문자열
 */
export const formatSelectedDate = (date: { year: number; month: number; day: number }): string => {
  return `${String(date.year)}-${String(date.month).padStart(2, "0")}-${String(date.day).padStart(2, "0")}`;
};

/**
 * 제공된 연도와 월이 현재 연도와 월과 일치하는지 확인합니다.
 *
 * @param selectedDate - 확인할 연도와 월을 포함한 날짜 객체입니다.
 * @returns - 선택한 날짜가 현재 연도와 월과 같으면 `true`를, 그렇지 않으면 `false`를 반환합니다.
 */
export const isCurrentMonth = (selectedDate: { year: number; month: number }): boolean => {
  const today = new Date();
  return selectedDate.year === today.getFullYear() && selectedDate.month === today.getMonth() + 1;
};

/**
 * 주어진 날짜 객체나 문자열을 "HH:mm" 형식의 문자열로 변환합니다.
 *
 * date - 변환할 날짜 또는 시간 문자열
 * returns 변환된 시간 문자열 ("HH:mm" 형식)
 */
export function formatTime(date: Date | string): string {
  const dateObj = typeof date === "string" ? new Date(date) : date;
  return dateObj.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}

/**
 * 현재 시간이 주어진 시작 및 종료 시간 사이에 있는지 확인합니다.
 *
 * start - 시작 시간 또는 문자열
 * end - 종료 시간 또는 문자열
 * returns 현재 시간이 시작 및 종료 시간 사이에 있으면 true, 그렇지 않으면 false
 */
export function isInProgress(start: Date | string, end: Date | string): boolean {
  const now = new Date();
  const startTime = typeof start === "string" ? new Date(start) : start;
  const endTime = typeof end === "string" ? new Date(end) : end;
  return now >= startTime && now <= endTime;
}

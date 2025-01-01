import { parseISO } from "date-fns";

/**
 * 주어진 시간(Date 객체 또는 ISO 문자열)을 분 단위로 변환합니다.
 * @param time Date 객체 또는 ISO 문자열
 * @returns 분 단위의 숫자
 */

export const timeToMinutes = (time: Date | string): number => {
  const date = typeof time === "string" ? parseISO(time) : time;
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return hours * 60 + minutes;
};

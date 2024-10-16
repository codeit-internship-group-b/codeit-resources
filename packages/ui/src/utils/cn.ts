import type { ClassValue } from "clsx";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * CSS 클래스 이름을 병합하고, 중복된 클래스를 제거합니다.
 * @param inputs - 클래스 이름 문자열 또는 객체들을 배열로 전달합니다.
 * @returns 병합된 클래스 이름 문자열을 반환합니다.
 *
 */
const cn = (...inputs: ClassValue[]): string => twMerge(clsx(inputs));

export default cn;

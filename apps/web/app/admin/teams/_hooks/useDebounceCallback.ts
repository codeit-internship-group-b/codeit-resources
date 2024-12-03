import { useMemo } from "react";
import { debounce } from "es-toolkit";

/**
 * 디바운스 처리된 콜백을 React 환경에서 사용하는 훅
 * @param callback - 디바운스 처리할 콜백 함수
 * @param delay - 디바운스 지연 시간 (ms)
 * @returns 디바운스 처리된 콜백 함수
 */
export function useDebouncedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  delay: number,
): (...args: Parameters<T>) => void {
  return useMemo(() => debounce(callback, delay), [callback, delay]);
}

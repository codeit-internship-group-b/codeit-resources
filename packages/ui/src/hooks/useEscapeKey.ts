// hooks/useEscapeKey.ts
import { useEffect } from "react";

/**
 * Escape 키를 눌렀을 때 콜백 함수를 호출하는 훅입니다.
 *
 * @param callback - Escape 키를 눌렀을 때 실행할 함수
 * @param enabled - 이벤트 리스너의 활성화 여부
 */
export default function useEscapeKey(callback: () => void, enabled = true): void {
  useEffect(() => {
    if (!enabled) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, enabled]);
}

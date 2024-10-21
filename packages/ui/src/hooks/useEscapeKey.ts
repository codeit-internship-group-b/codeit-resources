import { useEffect } from "react";

/**
 * Escape 키를 눌렀을 때 콜백 함수를 호출하는 훅입니다.
 *
 * @param callback - Escape 키를 눌렀을 때 실행할 함수
 * @param isActive - 이벤트 리스너의 활성화 여부 (기본값: true)
 */
export default function useEscapeKey(callback: () => void, isActive = true): void {
  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        callback();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [callback, isActive]);
}

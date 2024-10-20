import { useEffect } from "react";

export function useEscapeKey(handler: () => void, isActive: boolean): void {
  useEffect(() => {
    const listener = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        handler();
      }
    };
    if (isActive) {
      document.addEventListener("keydown", listener);
    }
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, [handler, isActive]);
}

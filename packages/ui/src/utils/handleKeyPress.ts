import { KeyboardEvent as ReactKeyboardEvent } from "react";

export const handleKeyPress = (e: ReactKeyboardEvent, callback: () => void) => {
  if (e.key === "Enter" || e.key === " ") {
    callback();
  }
};

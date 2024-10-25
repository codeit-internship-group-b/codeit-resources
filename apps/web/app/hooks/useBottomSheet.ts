import { useContext } from "react";
import { BottomSheetContext } from "../context/BottomSheetContext";

export const useBottomSheet = () => {
  const context = useContext(BottomSheetContext);
  if (!context) {
    throw new Error("Bottom Sheet components must be used within BottomSheet");
  }
  return context;
};

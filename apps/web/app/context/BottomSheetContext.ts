import { createContext } from "react";
import { type BottomSheetContextType } from "../types/BottomSheetTypes";

export const BottomSheetContext = createContext<BottomSheetContextType | null>(null);

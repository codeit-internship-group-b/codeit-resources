import { type ReactNode } from "react";

export interface RadioGroupProps {
  children: ReactNode;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  legend?: string;
}

export interface RadioOptionProps {
  value: string;
  children: ReactNode;
}

export interface RadioContextProps {
  selectedValue: string;
  selectOption: (value: string) => void;
}

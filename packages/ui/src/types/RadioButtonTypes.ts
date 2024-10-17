import { type ReactNode } from "react";

export interface RadioGroupProps {
  children: ReactNode;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

export interface RadioOptionProps {
  value: string;
  children: ReactNode;
}

export interface RadioContextProps {
  selectedValue: string;
  // eslint-disable-next-line no-unused-vars
  selectOption: (value: string) => void;
}

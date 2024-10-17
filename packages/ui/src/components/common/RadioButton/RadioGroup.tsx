"use client";

import { createContext, useState, type ReactNode } from "react";

export interface RadioGroupProps {
  children: ReactNode;
  defaultValue?: string;
  // eslint-disable-next-line no-unused-vars
  onChange?: (value: string) => void;
}

interface RadioContextProps {
  selectedValue: string;
  // eslint-disable-next-line no-unused-vars
  selectOption: (value: string) => void;
}

export const RadioContext = createContext<RadioContextProps | null>(null);

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { children, defaultValue = "", onChange } = props;

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const selectOption = (value: string): void => {
    setSelectedValue(value);
    onChange && onChange(value);
  };

  return (
    <RadioContext.Provider value={{ selectedValue, selectOption }}>
      <div role="radiogroup" className="flex">
        {children}
      </div>
    </RadioContext.Provider>
  );
}

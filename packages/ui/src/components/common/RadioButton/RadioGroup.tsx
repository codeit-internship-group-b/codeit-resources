"use client";

import { createContext, useState } from "react";
import { RadioGroupProps, RadioContextProps } from "@ui/src/types/RadioButtonTypes";

export const RadioContext = createContext<RadioContextProps | null>(null);

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { children, defaultValue = "", onChange } = props;

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const selectOption = (value: string): void => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <RadioContext.Provider value={{ selectedValue, selectOption }}>
      <div role="radiogroup" className="flex">
        {children}
      </div>
    </RadioContext.Provider>
  );
}

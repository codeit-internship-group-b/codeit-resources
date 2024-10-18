"use client";

import { createContext, useState } from "react";
import { RadioGroupProps, RadioContextProps } from "@ui/src/types/RadioButtonTypes";

export const RadioContext = createContext<RadioContextProps | null>(null);

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { children, defaultValue = "", onChange, legend } = props;

  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);

  const selectOption = (value: string): void => {
    setSelectedValue(value);
    onChange?.(value);
  };

  return (
    <RadioContext.Provider value={{ selectedValue, selectOption }}>
      <fieldset className="flex" role="radiogroup">
        {legend && <legend className="mb-4 text-lg font-semibold">{legend}</legend>}
        {children}
      </fieldset>
    </RadioContext.Provider>
  );
}

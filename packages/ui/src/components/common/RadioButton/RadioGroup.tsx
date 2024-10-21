/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use client";

import { createContext, useState } from "react";
import { type RadioGroupProps, type RadioContextProps } from "@ui/src/types/RadioButtonTypes";

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
        {legend ? <legend className="mb-4 text-lg font-semibold">{legend}</legend> : null}
        {children}
      </fieldset>
    </RadioContext.Provider>
  );
}

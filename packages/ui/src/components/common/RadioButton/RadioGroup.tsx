/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-redundant-type-constituents */
"use client";

import { createContext, useState } from "react";
import { type RadioGroupProps, type RadioContextProps } from "@ui/src/types/RadioButtonTypes";

export const RadioContext = createContext<RadioContextProps | null>(null);

export function RadioGroup(props: RadioGroupProps): JSX.Element {
  const { children, defaultValue = "", value, onChange, legend } = props;

  const [internalValue, setInternalValue] = useState<string>(defaultValue);

  // 외부 value가 있으면 외부 value를 사용하고 없으면 내부 value 사용
  const selectedValue = value !== undefined ? value : internalValue;

  const selectOption = (newValue: string): void => {
    setInternalValue(newValue);
    onChange?.(newValue);
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

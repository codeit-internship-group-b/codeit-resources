/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { type ReactNode, useContext } from "react";
import { RadioContext } from "./RadioGroup";

export interface RadioOptionProps {
  value: string;
  children: ReactNode;
  description?: ReactNode;
  disabled?: boolean;
}

export function RadioOption({ value, children, description, disabled = false }: RadioOptionProps): JSX.Element {
  const context = useContext(RadioContext);

  if (!context) {
    throw new Error("Radio 그룹 안에서 사용해야 합니다! 조심조심");
  }

  const { selectedValue, selectOption } = context;
  const isSelected = selectedValue === value;

  const handleChange = (): void => {
    if (!disabled) {
      selectOption(value);
    }
  };

  const labelClassName = `group flex items-start gap-6 ${
    disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
  }`;

  let outerSpanClassName =
    "relative mt-2 flex h-16 w-16 items-center justify-center rounded-full border md:h-20 md:w-20";

  if (disabled) {
    if (isSelected) {
      outerSpanClassName += " bg-custom-black/30 border-gray-200/10";
    } else {
      outerSpanClassName += " border-gray-200/10 bg-white/30";
    }
  } else if (isSelected) {
    outerSpanClassName += " border-purple-700 bg-purple-700 group-hover:border-purple-900 group-hover:bg-purple-900";
  } else {
    outerSpanClassName += " border-custom-black/20 group-hover:bg-custom-black/5 bg-white/40";
  }

  let innerSpanClassName = "h-6 w-6 rounded-full md:h-8 md:w-8";

  if (disabled) {
    if (isSelected) {
      innerSpanClassName += " bg-white/60";
    } else {
      innerSpanClassName += " bg-white/40";
    }
  } else {
    innerSpanClassName += ` bg-white${!isSelected ? " group-hover:bg-white/10" : ""}`;
  }

  const textClassName = `text-md-medium md:text-lg-medium ${
    disabled ? "text-custom-black/30" : "text-custom-black/80 group-hover:text-custom-black"
  }`;

  const descriptionClassName = `text-xxs-medium md:text-xs-medium text-gray-500 ${
    disabled ? "text-custom-black/30" : ""
  }`;

  return (
    <label className={labelClassName}>
      <input
        type="radio"
        value={value}
        checked={isSelected}
        onChange={handleChange}
        disabled={disabled}
        className="hidden"
      />
      <span className={outerSpanClassName}>
        <span className={innerSpanClassName} />
      </span>
      <div className="flex flex-col">
        <span className={textClassName}>{children}</span>
        {description != null && <span className={descriptionClassName}>{description}</span>}
      </div>
    </label>
  );
}

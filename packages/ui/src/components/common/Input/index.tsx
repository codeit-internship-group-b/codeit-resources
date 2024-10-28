"use client";

import cn from "@ui/src/utils/cn";
import { InputHTMLAttributes, useState, ChangeEvent, useEffect, forwardRef } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  type?: "text" | "password" | "number" | "email";
  isError?: boolean;
  errorMessage?: string;
  className?: string;
  register?: UseFormRegisterReturn;
  value?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, id, type = "text", isError, errorMessage, className, value = "", register, ...args }, ref) => {
    const { onChange = () => {}, onBlur = () => {}, disabled, name, ref: regRef } = register || {};
    const [hasValue, setHasValue] = useState(!!value);

    useEffect(() => {
      setHasValue(!!value);
    }, [value]);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      setHasValue(!!e.target.value);
      onChange(e);
    };

    return (
      <div className={cn("group relative", className)}>
        <input
          id={id}
          defaultValue={value}
          name={name || id}
          type={type}
          className={cn(
            "transition-linear border-custom-black/40 hover:bg-custom-black/5 peer w-full rounded-lg border border-solid p-14 placeholder-transparent focus:hover:bg-purple-700/5",
            {
              "border-error focus:hover:bg-custom-black/5": isError,
              "focus:border-purple-400": !isError,
            },
          )}
          style={{ outline: "none" }}
          placeholder={placeholder}
          onBlur={onBlur}
          onChange={handleChange}
          disabled={disabled}
          ref={ref || regRef}
          {...args}
        />
        <label
          htmlFor={id}
          className={cn(
            "bottom-39 transition-linear text-custom-black/80 peer-focus:-translate-y-27 peer-focus:!text-13 relative left-16 z-10 bg-transparent p-0 leading-none peer-placeholder-shown:translate-y-0 peer-focus:bg-white peer-focus:px-3",
            {
              "peer-focus:bg-transparent peer-focus:text-purple-400": !isError,
              "peer-focus:text-error peer-focus:bg-transparent": isError,
              "-translate-y-27 !text-13 bg-transparent px-3": !isError && hasValue,
              "-translate-y-27 !text-13 text-error bg-transparent px-3": isError && hasValue,
            },
          )}
          style={{ display: "inline-block" }}
        >
          <span className="relative z-10">{placeholder}</span>
          <span
            className={cn("absolute bottom-6 left-0 right-0 z-0 h-4 group-focus-within:bg-white", {
              "bottom-6 bg-white": hasValue,
            })}
          />
        </label>
        {isError && <ErrorMessage className="-bottom-6 left-20" message={errorMessage} />}
      </div>
    );
  },
);

export default Input;

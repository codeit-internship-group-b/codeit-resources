"use client";

import cn from "@ui/src/utils/cn";
import { InputHTMLAttributes, forwardRef } from "react";
import { FieldError, UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: "text" | "password" | "number" | "email";
  className?: string;
  register?: UseFormRegisterReturn;
  error?: FieldError;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ placeholder, type = "text", className, error, register, ...args }, ref) => {
    const { onChange, onBlur, disabled, name, ref: regRef } = register ?? {};

    const isError = Boolean(error);
    const errorMessage = error?.message;
    return (
      <div
        className={cn("group relative", {
          "pb-10": isError,
        })}
      >
        <input
          id={name}
          name={name}
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
          onChange={onChange}
          disabled={disabled}
          ref={regRef}
          {...args}
        />
        <label
          htmlFor={name}
          className={cn(
            "peer-[:not(:placeholder-shown)]:-translate-y-27 peer-[:not(:placeholder-shown)]:text-13 bottom-39 transition-linear text-custom-black/80 peer-focus:-translate-y-27 peer-focus:!text-13 relative left-16 z-10 bg-transparent p-0 leading-none peer-placeholder-shown:translate-y-0 peer-focus:bg-white peer-focus:px-3 peer-[:not(:placeholder-shown)]:px-3",
            {
              "peer-focus:bg-transparent peer-focus:text-purple-400": !isError,
              "peer-focus:text-error peer-focus:bg-transparent": isError,
              "text-error": isError,
            },
          )}
          style={{ display: "inline-block" }}
        >
          <span className="relative z-10">{placeholder}</span>
          <span
            className={cn(
              "absolute bottom-6 left-0 right-0 z-0 h-4",
              "group-focus-within:bg-white",
              "group-hover:bg-transparent",
              "group-placeholder-shown:bg-transparent",
              "group-[:not(:placeholder-shown)]:bg-white",
            )}
          />
        </label>
        {isError ? <ErrorMessage className="left-6" message={errorMessage} /> : null}
      </div>
    );
  },
);

Input.displayName = "Input";

export default Input;

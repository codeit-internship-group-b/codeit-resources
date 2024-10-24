"use client";

import cn from "@ui/src/utils/cn";
import { ChangeEvent, InputHTMLAttributes, useEffect, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import ErrorMessage from "../ErrorMessage";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  placeholder: string;
  type?: "text" | "password" | "number" | "email";
  value?: string;
  isError?: boolean;
  errorMessage?: string;
  className?: string;
  register?: UseFormRegisterReturn;
}

/**
 * `Input` 컴포넌트는 사용자로부터 입력을 받는 텍스트 필드를 렌더링합니다.
 *
 * @param {string} id - 컴포넌트의 고유 ID. `label`과 `input`을 연결하기 위해 사용됩니다.
 * @param {string} placeholder - 입력 필드에 표시될 기본 힌트 텍스트입니다.
 * @param {"text" | "password" | "number" | "email"} [type="text"] - 입력 필드의 타입을 지정합니다. 기본값은 `text`입니다.
 * @param {string} [value=""] - 입력 필드의 기본값입니다.
 * @param {boolean} [isError=false] - 에러 상태 여부를 나타냅니다. `true`일 경우 에러 스타일을 적용합니다.
 * @param {string} [errorMessage] - 에러 메시지를 표시할 텍스트입니다.
 * @param {string} [className] - 추가적인 CSS 클래스 이름을 설정할 수 있습니다.
 * @param {UseFormRegisterReturn} [register] - `react-hook-form`의 `register` 객체를 사용하여 입력 필드의 이벤트와 값을 관리합니다.
 * @param {object} args - 그 외 추가적인 속성들을 전달할 수 있습니다.
 * @author 조현지
 */
export default function Input({
  placeholder,
  id,
  type = "text",
  isError,
  errorMessage,
  className,
  value = "",
  register = {
    onChange: async () => {},
    onBlur: async () => {},
    ref: (e: HTMLInputElement | null) => {
      e;
    },
    name: "",
  },
  ...args
}: InputProps) {
  const [hasValue, setHasValue] = useState(!!value);
  const { onChange, onBlur, ref, disabled, name } = register;

  useEffect(() => {
    if (value) {
      setHasValue(true);
    }
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
        ref={ref}
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
}

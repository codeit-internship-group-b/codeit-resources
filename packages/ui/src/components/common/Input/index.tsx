import cn from "@ui/src/utils/cn";
import { ChangeEvent, InputHTMLAttributes, useState } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

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
    ref: (e: HTMLInputElement | null) => {},
    name: "",
  },
  ...args
}: InputProps) {
  const [hasValue, setHasValue] = useState(!!value);
  const { onChange, onBlur, ref, disabled, name } = register;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setHasValue(!!e.target.value);
    onChange(e);
  };

  return (
    <div className={cn("relative group", className)}>
      <input
        id={id}
        defaultValue={value}
        name={name || id}
        type={type}
        className={cn(
          "trasition-linear peer border-custom-black/40 placeholder-transparent w-full border border-solid rounded-lg p-14 hover:bg-custom-black/5 focus:hover:bg-purple-700/5",
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
          "relative z-10 leading-none bg-transparent left-16 bottom-39 trasition-linear text-custom-black/80 p-0 peer-placeholder-shown:translate-y-0 peer-focus:-translate-y-27 peer-focus:bg-white peer-focus:!text-13 peer-focus:px-3",
          {
            "peer-focus:text-purple-400 peer-focus:bg-transparent": !isError,
            "peer-focus:text-error peer-focus:bg-transparent": isError,
            "-translate-y-27 bg-transparent !text-13 px-3": !isError && hasValue,
            "-translate-y-27 bg-transparent !text-13 px-3 text-error": isError && hasValue,
          },
        )}
        style={{ display: "inline-block" }}
      >
        <span className="relative z-10">{placeholder}</span>
        <span
          className={cn("absolute bottom-6 left-0 right-0 group-focus-within:bg-white h-4 z-0", {
            "bottom-6 bg-white": hasValue,
          })}
        />
      </label>
      {isError && <span className="absolute bottom-0 block text-13 text-error pl-20 pt-9">{errorMessage}</span>}
    </div>
  );
}

import React, { ComponentProps } from "react";
import clsx from "clsx";

interface ButtonProps extends ComponentProps<"button"> {
  variant: "Action" | "primary" | "secondary" | "Tertiary" | "Text";
  isActive?: boolean;
  className?: string;
  children: React.ReactNode;
}

export default function Button(props: ButtonProps) {
  const { variant, isActive = true, className = "", children, ...rest } = props;

  // 기본 버튼 스타일 (Base button styles)
  const baseClassName = "h-11 rounded-lg text-md-semibold px-5 py-2.5 max-w-[400px]";

  const variantClassName = clsx(
    // 공통 스타일 (Common styles)
    "center",

    {
      // primary 버튼 스타일
      // 활성화된 상태 (When isActive is true)
      "text-white bg-primary-green-200 hover:bg-primary-green-300": variant === "primary" && isActive,
      // 비활성화된 상태 (When isActive is false)
      "text-white bg-grayscale-300": variant === "primary" && !isActive,

      // secondary 버튼 스타일
      "text-primary-green-200 border-2 border-primary-green-200": variant === "secondary",

      // Action 버튼 스타일
      // 여기서는 예시로 빨간색 배경과 흰색 텍스트를 적용합니다.
      "bg-red-500 text-white": variant === "Action",

      // Tertiary 버튼 스타일
      // 회색 텍스트와 투명한 배경
      "text-gray-700 bg-transparent": variant === "Tertiary",

      // Text 버튼 스타일
      // 배경 없고 밑줄 효과를 가집니다.
      "bg-transparent text-blue-500 underline": variant === "Text",
    },
  );

  return (
    <button className={clsx(baseClassName, className, variantClassName)} {...rest}>
      {children}
    </button>
  );
}

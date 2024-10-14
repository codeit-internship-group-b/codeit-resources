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
  const baseClassName = "";

  const variantClassName = clsx(
    // 공통 스타일 (Common styles)
    "center",

    // variant에 따른 스타일
    {
      // Action 버튼 스타일
      "text-lg-bold border-custom-black md:text-2lg-bold flex h-40 w-full items-center justify-center rounded-lg border-2 px-20 py-8 text-center md:h-48 md:px-32 md:py-10 md:w-auto":
        variant === "Action",
      [isActive
        ? "bg-purple-400 text-white/90 hover:bg-purple-800 hover:text-white"
        : "bg-gray-200/10 text-custom-black/30 cursor-not-allowed hover:bg-gray-200/10"]: variant === "Action",

      // primary 버튼 스타일
      "min-w-68 text-sm-medium md:min-w-84 md:text-md-medium lg:min-w-100 lg:h-42 flex h-32 items-center justify-center gap-4 rounded-md px-12 py-6 md:h-40 md:rounded-lg md:px-16 md:py-8 lg:rounded-lg lg:px-24 lg:py-8":
        variant === "primary",
      [isActive
        ? "bg-purple-400 text-white hover:bg-purple-800"
        : "bg-gray-200/10 text-custom-black/30 cursor-not-allowed hover:bg-gray-200/10"]: variant === "primary",

      // secondary 버튼 스타일
      "min-w-68 text-sm-medium md:min-w-84 md:text-md-medium lg:min-w-100 lg:h-42 flex h-32 items-center border-1 border-custom-black/20 justify-center gap-4 rounded-md px-12 py-6 md:h-40 md:rounded-lg md:px-16 md:py-8 lg:rounded-lg lg:px-24 lg:py-8":
        variant === "secondary",
      [isActive
        ? "bg-white/40 text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black"
        : "bg-gray-200/10 text-custom-black/30 cursor-not-allowed hover:bg-gray-200/10"]: variant === "secondary",

      // Tertiary 버튼 스타일
      "text-gray-700 bg-transparent": variant === "Tertiary",

      // Text 버튼 스타일
      "bg-transparent text-blue-500 underline": variant === "Text",
    },
  );

  return (
    <button className={clsx(baseClassName, className, variantClassName)} {...rest}>
      {children}
    </button>
  );
}

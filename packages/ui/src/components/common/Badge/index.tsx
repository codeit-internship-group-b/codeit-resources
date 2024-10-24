"use client";

import { type ReactNode } from "react";

export interface BadgeProps {
  color: "purple" | "green" | "pink" | "yellow" | "gray" | "blue";
  shape: "square" | "round";
  colorApplyTo: "font" | "background";
  children: ReactNode;
}

const colorShades: Record<
  BadgeProps["color"],
  {
    font: { text: string; bg: string };
    background: { text: string; bg: string };
  }
> = {
  purple: {
    font: { text: "purple-300", bg: "purple-100" },
    background: { text: "purple-100", bg: "purple-300" },
  },
  green: {
    font: { text: "green-20", bg: "green-10" },
    background: { text: "green-10", bg: "green-20" },
  },
  pink: {
    font: { text: "pink-10", bg: "pink-40" },
    background: { text: "pink-40", bg: "pink-10" },
  },
  yellow: {
    font: { text: "yellow-20", bg: "yellow-10" },
    background: { text: "yellow-10", bg: "yellow-50" },
  },
  gray: {
    font: { text: "gray-30", bg: "gray-10" },
    background: { text: "gray-10/100", bg: "gray-20" },
  },
  blue: {
    font: { text: "blue-20", bg: "blue-10" },
    background: { text: "blue-10", bg: "blue-20" },
  },
};

/**
 * `Badge` 컴포넌트는 다양한 스타일과 모양을 가진 라벨을 렌더링합니다.
 *
 * @param {"purple" | "green" | "pink" | "yellow" | "gray" | "blue"} color - 라벨의 색상입니다.
 * @param {"font" | "background"} colorApplyTo - 색상이 폰트에 적용될지 배경에 적용될지 결정합니다.
 * @param {ReactNode} children - 라벨 컴포넌트 내부에 표시될 내용입니다.
 * @returns {JSX.Element} 스타일이 적용된 라벨 요소를 반환합니다.
 *
 * @example
 * <Badge color="purple" shape="round" colorApplyTo="font">
 *   Example Badge
 * </Badge>
 *
 * @author 배영준
 */

export default function Badge(props: BadgeProps): JSX.Element {
  const { color, shape, colorApplyTo, children } = props;
  const baseClasses =
    "flex items-center justify-center h-20 md:h-28 lg:h-32 px-4 md:py-4 md:px-8 lg:px-10 lg:py-6 text-xs-medium md:text-md-medium lg:text-lg-medium";
  const shapeClass = shape === "round" ? "rounded-32" : "rounded-2 md:rounded-4 lg:rounded-6";

  const shades = colorShades[color][colorApplyTo];
  const appliedColorClass = `text-${shades.text} bg-${shades.bg}`;

  return <span className={`${baseClasses} ${shapeClass} ${appliedColorClass}`}>{children}</span>;
}

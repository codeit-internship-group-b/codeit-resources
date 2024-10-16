"use client";

import { type ReactNode } from "react";

export interface LabelProps {
  color: "purple" | "green" | "red" | "yellow" | "gray" | "blue";
  shape: "square" | "round";
  colorApplyTo: "font" | "background";
  children: ReactNode;
}

const colorShades: Record<
  LabelProps["color"],
  {
    font: { text: string; bg: string };
    background: { text: string; bg: string };
  }
> = {
  purple: {
    font: { text: "purple-50", bg: "purple-800" },
    background: { text: "purple-800", bg: "purple-50" },
  },
  green: {
    font: { text: "green-100", bg: "green-700" },
    background: { text: "green-700", bg: "green-100" },
  },
  red: {
    font: { text: "red-200", bg: "red-600" },
    background: { text: "red-600", bg: "red-200" },
  },
  yellow: {
    font: { text: "yellow-300", bg: "yellow-500" },
    background: { text: "yellow-500", bg: "yellow-300" },
  },
  gray: {
    font: { text: "gray-400", bg: "gray-900" },
    background: { text: "gray-900", bg: "gray-400" },
  },
  blue: {
    font: { text: "blue-50", bg: "blue-800" },
    background: { text: "blue-800", bg: "blue-50" },
  },
};

export default function Label(props: LabelProps): JSX.Element {
  const { color, shape, colorApplyTo, children } = props;
  const baseClasses = "inline-block px-3 py-1 text-sm font-medium";
  const shapeClass = shape === "round" ? "rounded-full" : "rounded";

  const shades = colorShades[color][colorApplyTo];
  const appliedColorClass = `text-${shades.text} bg-${shades.bg}`;

  return <span className={`${baseClasses} ${shapeClass} ${appliedColorClass}`}>{children}</span>;
}

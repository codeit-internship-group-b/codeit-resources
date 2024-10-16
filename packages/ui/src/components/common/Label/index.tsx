"use client";

import { type ReactNode } from "react";

export interface LabelProps {
  color: "purple" | "green" | "pink" | "yellow" | "gray" | "blue";
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
    font: { text: "purple-300", bg: "purple-100" },
    background: { text: "purple-100", bg: "purple-300" },
  },
  green: {
    font: { text: "green-20", bg: "green-10" },
    background: { text: "green-10", bg: "green-20" },
  },
  pink: {
    font: { text: "pink-20", bg: "pink-10" },
    background: { text: "pink-10", bg: "pink-20" },
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

export default function Label(props: LabelProps): JSX.Element {
  const { color, shape, colorApplyTo, children } = props;
  const baseClasses = "inline-block px-3 py-1 text-sm font-medium";
  const shapeClass = shape === "round" ? "rounded-full" : "rounded";

  const shades = colorShades[color][colorApplyTo];
  const appliedColorClass = `text-${shades.text} bg-${shades.bg}`;

  return <span className={`${baseClasses} ${shapeClass} ${appliedColorClass}`}>{children}</span>;
}

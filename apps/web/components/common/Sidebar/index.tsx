"use client";

import React, { type ReactNode, useEffect, useState } from "react";
import { DoubleChevron } from "@ui/public";
import { createPortal } from "react-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * 사이드바 컴포넌트입니다.
 *
 * @param props - 컴포넌트의 props
 * @param children - children
 * @returns JSX.Element 사이드바 컴포넌트 요소
 * 
 * const [isSidebarOpen, setIsSidebarOpen] = useState(false);
 *
      \<Sidebar
        isOpen=\{isSidebarOpen\}
        onClose=\{() =\> \{
          setIsSidebarOpen(false);
        \}\}
      /\>
 */

export default function Sidebar(props: SidebarProps): JSX.Element | null {
  const { isOpen, onClose, children } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Ensure this component only renders on the client to avoid hydration issues
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`min-w-400 border-l-1 border-custom-black/20 fixed right-0 top-0 h-full transform bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <DoubleChevron
        className="my-8 ml-8 size-40 cursor-pointer p-8"
        onClick={() => {
          onClose();
        }}
      />
      <div className="px-32">{children}</div>
    </div>,
    document.body,
  );
}

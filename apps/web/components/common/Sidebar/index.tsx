"use client";

import React, { type ReactNode } from "react";
import { DoubleChevron } from "@ui/public";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

/**
 * 사이드바 컴포넌트입니다.
 *
 * @param props - 컴포넌트의 props
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
      <Ex />
      </Sidebar>
 * 
 */

export default function Sidebar(props: SidebarProps): JSX.Element {
  const { isOpen, onClose, children } = props;
  return (
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
    </div>
  );
}

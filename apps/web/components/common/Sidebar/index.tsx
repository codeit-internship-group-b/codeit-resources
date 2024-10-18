"use client";

import React from "react";
import { DoubleChevron } from "@ui/public";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
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
 * 
 */

function Sidebar(props: SidebarProps): JSX.Element {
  const { isOpen, onClose } = props;
  return (
    <div
      className={`min-w-400 border-l-1 border-custom-black/20 fixed right-0 top-0 h-full transform bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button
        type="button"
        className="my-8 ml-8 size-40 cursor-pointer p-8"
        onClick={() => {
          onClose();
        }}
      >
        <DoubleChevron />
      </button>

      <div className="px-32">사이드바 내용입니당</div>
    </div>
  );
}

export default Sidebar;

import React, { type ReactNode, useEffect, useState } from "react";
import { DoubleChevron } from "@ui/public";
import { createPortal } from "react-dom";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  children?: ReactNode;
}

export default function Sidebar(props: SidebarProps): JSX.Element | null {
  const { isOpen, onClose, children } = props;
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return createPortal(
    <>
      {/* 배경 오버레이 */}
      {isOpen ? <div className="fixed inset-0 z-40" onClick={onClose} /> : null}

      <div
        className={`min-w-500 max-w-500 border-l-1 border-custom-black/20 transition-linear transition-linear fixed right-0 top-0 z-50 hidden h-full bg-white shadow-lg md:block ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <DoubleChevron
          className="my-8 ml-8 size-40 cursor-pointer p-8"
          onClick={onClose} // 아이콘 클릭 시 닫힘
        />
        <div className="px-32">{children}</div>
      </div>
    </>,
    document.body,
  );
}

"use client";

import { type ReactNode, useState } from "react";
import Sidebar from "./index";

interface SideLayoutProps {
  children: ReactNode;
}

export default function SideLayout(props: SideLayoutProps): JSX.Element {
  const { children } = props;

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          setIsSidebarOpen(true);
        }}
        className="bg-blue-500 p-2 text-white"
      >
        사이드바 열기
      </button>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      />
      {children}
    </div>
  );
}

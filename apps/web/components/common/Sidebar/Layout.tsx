"use client";

import React, { type ReactNode, useState } from "react";
import Sidebar from "./index";

interface LayoutProps {
  children: ReactNode;
}

function Layout(props: LayoutProps): JSX.Element {
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

export default Layout;

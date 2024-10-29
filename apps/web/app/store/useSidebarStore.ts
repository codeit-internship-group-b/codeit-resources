// stores/sidebarStore.ts
import { create } from "zustand";

interface SidebarState {
  isSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  resetClickedSlot: () => void; // 추가
}

export const useSidebarStore = create<SidebarState>((set) => ({
  isSidebarOpen: false,
  openSidebar: () => { set({ isSidebarOpen: true }); },
  closeSidebar: () => { set({ isSidebarOpen: false }); },
  resetClickedSlot: () => { set({ isSidebarOpen: false }); }, // 닫힐 때 초기화
}));

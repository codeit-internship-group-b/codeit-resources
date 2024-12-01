import { create } from "zustand";
import { type IRoom, type IEquipment, type ICategory } from "@repo/types";
import { notify } from "@ui/index";
import { postNewItem, patchItem, deleteItem } from "@/api/meetings"; // API 요청 함수 예시

interface MeetingsStore {
  categories: ICategory[];
  rooms: IRoom[];
  panelState: string;
  isLoading: boolean;
  error: string | null;
  currentItem: IRoom | null;
  currentCategory: ICategory | null;

  setCategories: (categories: ICategory[]) => void;
  setRooms: (rooms: IRoom[]) => void;
  setPanelState: (panelState: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  setCurrentItem: (item: IRoom | null) => void;
  setCurrentCategory: (category: ICategory | null) => void;

  handleAddItem: (data: FormData) => Promise<IRoom | IEquipment | string>;
  handleEditItem: (data: FormData, itemId: string) => Promise<IRoom | IEquipment | string>;
  handleDeleteItem: (itemId: string) => Promise<void>;
}

const useMeetingsStore = create<MeetingsStore>((set) => ({
  categories: [],
  rooms: [],
  panelState: "add",
  isLoading: false,
  error: null,
  currentItem: null,
  currentCategory: null,

  setCategories: (categories) => {
    set({ categories });
  },
  setRooms: (rooms) => {
    set({ rooms });
  },
  setPanelState: (panelState) => {
    set({ panelState });
  },
  setLoading: (isLoading) => {
    set({ isLoading });
  },
  setError: (error) => {
    set({ error });
  },
  setCurrentItem: (item) => {
    set({ currentItem: item });
  },
  setCurrentCategory: (category) => {
    set({ currentCategory: category });
  },

  handleAddItem: async (data: FormData): Promise<IRoom | IEquipment | string> => {
    set({ isLoading: true, error: null });
    try {
      const res = await postNewItem("room", data);
      set({ isLoading: false });
      return res;
    } catch (error) {
      notify({ type: "error", message: "잘못된 요청입니다." });
      throw new Error();
    }
  },
  handleEditItem: async (data: FormData, itemId: string): Promise<IRoom | IEquipment | string> => {
    set({ isLoading: true, error: null });
    try {
      const res = await patchItem(itemId, data);
      set({ isLoading: false });
      return res;
    } catch (error) {
      notify({ type: "error", message: "잘못된 요청입니다." });
      throw new Error();
    }
  },
  handleDeleteItem: async (itemId: string): Promise<void> => {
    try {
      await deleteItem(itemId);
      notify({ type: "success", message: "삭제되었습니다." });
    } catch (error) {
      notify({ type: "error", message: "삭제 실패" });
    }
  },
}));

export default useMeetingsStore;

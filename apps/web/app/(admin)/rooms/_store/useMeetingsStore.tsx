import { create } from "zustand";
import { type IRoom, type IEquipment, type ICategory } from "@repo/types";
import { AxiosError } from "axios";
import { postNewRoom, deleteRoom, patchRoom } from "@/api/meetings"; // API 요청 함수 예시
import { notify } from "@/app/store/useToastStore";

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

  handleAddItem: (data: Record<string, string>) => Promise<IRoom | IEquipment | string>;
  handleEditItem: (data: Record<string, string>, itemId: string) => Promise<IRoom | IEquipment | string>;
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

  handleAddItem: async (data): Promise<IRoom | IEquipment | string> => {
    set({ isLoading: true, error: null });
    try {
      const res = await postNewRoom("room", data);
      set({ isLoading: false });
      return res;
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof AxiosError && error.response) {
        throw new Error(String(error.response.data.message));
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  },
  handleEditItem: async (data, itemId): Promise<IRoom | IEquipment | string> => {
    set({ isLoading: true, error: null });
    try {
      const res = await patchRoom(itemId, data);
      set({ isLoading: false });
      return res;
    } catch (error) {
      set({ isLoading: false });
      if (error instanceof AxiosError && error.response) {
        throw new Error(String(error.response.data.message));
      } else {
        throw new Error("알 수 없는 오류가 발생했습니다. 다시 시도해주세요.");
      }
    }
  },
  handleDeleteItem: async (itemId): Promise<void> => {
    set({ isLoading: true, error: null });
    try {
      await deleteRoom(itemId);
      set({ isLoading: false });
      notify("success", "삭제되었습니다.");
    } catch (error) {
      set({ isLoading: false });
      notify("error", "삭제 실패");
    }
  },
}));

export default useMeetingsStore;

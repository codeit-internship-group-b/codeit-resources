import { create } from "zustand";
import { dayNames } from "@repo/ui/src/utils/constants/dayNames";

interface DateStore {
  selectedDate: {
    year: number;
    month: number;
    day: number;
    dayOfWeek: string;
  };
  setSelectedDate: (date: { year: number; month: number; day: number }) => void;
  setSelectedYear: (year: number) => void;
  setSelectedMonth: (month: number) => void;
  setSelectedDay: (day: number) => void;
  handlePrevMonth: () => void;
  handleNextMonth: () => void;
}

const getDayOfWeek = (date: Date): string => {
  const dayOfWeek = dayNames[date.getDay()];
  return dayOfWeek ?? "알 수 없음";
};

export const useDateStore = create<DateStore>((set) => ({
  selectedDate: {
    year: new Date().getFullYear(),
    month: new Date().getMonth() + 1,
    day: new Date().getDate(),
    dayOfWeek: getDayOfWeek(new Date()),
  },

  // 전체 날짜 객체를 한 번에 설정하는 함수
  setSelectedDate: (date) => {
    const selectedDate = new Date(date.year, date.month - 1, date.day);
    const dayOfWeek = getDayOfWeek(selectedDate);
    set({
      selectedDate: {
        ...date,
        dayOfWeek,
      },
    });
  },

  // 연도만 업데이트하는 함수
  setSelectedYear: (year) => {
    set((state) => {
      const newDate = new Date(year, state.selectedDate.month - 1, state.selectedDate.day);
      const dayOfWeek = getDayOfWeek(newDate);
      return {
        selectedDate: { ...state.selectedDate, year, dayOfWeek },
      };
    });
  },

  // 월만 업데이트하는 함수
  setSelectedMonth: (month) => {
    set((state) => {
      const newDate = new Date(state.selectedDate.year, month - 1, state.selectedDate.day);
      const dayOfWeek = getDayOfWeek(newDate);
      return {
        selectedDate: { ...state.selectedDate, month, dayOfWeek },
      };
    });
  },

  // 일만 업데이트하는 함수
  setSelectedDay: (day) => {
    set((state) => {
      const newDate = new Date(state.selectedDate.year, state.selectedDate.month - 1, day);
      const dayOfWeek = getDayOfWeek(newDate);
      return {
        selectedDate: { ...state.selectedDate, day, dayOfWeek },
      };
    });
  },

  // 이전 달로 이동하는 함수
  handlePrevMonth: () => {
    set((state) => {
      const { year, month } = state.selectedDate;
      let newYear = year;
      let newMonth = month - 1;

      if (newMonth === 0) {
        newYear -= 1;
        newMonth = 12;
      }

      const newDate = new Date(newYear, newMonth - 1, state.selectedDate.day);
      const dayOfWeek = getDayOfWeek(newDate);
      return { selectedDate: { ...state.selectedDate, year: newYear, month: newMonth, dayOfWeek } };
    });
  },

  // 다음 달로 이동하는 함수
  handleNextMonth: () => {
    set((state) => {
      const { year, month } = state.selectedDate;
      let newYear = year;
      let newMonth = month + 1;

      if (newMonth === 13) {
        newYear += 1;
        newMonth = 1;
      }

      const newDate = new Date(newYear, newMonth - 1, state.selectedDate.day);
      const dayOfWeek = getDayOfWeek(newDate);
      return { selectedDate: { ...state.selectedDate, year: newYear, month: newMonth, dayOfWeek } };
    });
  },
}));

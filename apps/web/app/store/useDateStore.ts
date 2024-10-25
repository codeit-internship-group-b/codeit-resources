import { create } from "zustand";
import { DAY_NAMES } from "@repo/ui/src/utils/constants/dayNames";

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
  const dayOfWeek = DAY_NAMES[date.getDay()];
  return dayOfWeek ?? "알 수 없음";
};

const calculateNewDate = (year: number, month: number, day: number): { newDate: Date; dayOfWeek: string } => {
  const daysInMonth = new Date(year, month, 0).getDate();
  let validDay = day;
  if (validDay > daysInMonth) {
    validDay = daysInMonth;
  }

  const newDate = new Date(year, month - 1, validDay);
  const dayOfWeek = getDayOfWeek(newDate);

  return { newDate, dayOfWeek };
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
    const { dayOfWeek } = calculateNewDate(date.year, date.month, date.day);
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
      const { month, day } = state.selectedDate;
      const { dayOfWeek } = calculateNewDate(year, month, day);
      return {
        selectedDate: { ...state.selectedDate, year, dayOfWeek },
      };
    });
  },

  // 월만 업데이트하는 함수
  setSelectedMonth: (month) => {
    set((state) => {
      if (state.selectedDate.month === month) return state;
      const { year, day } = state.selectedDate;
      const { dayOfWeek } = calculateNewDate(year, month, day);
      return {
        selectedDate: { ...state.selectedDate, month, day, dayOfWeek },
      };
    });
  },

  // 일만 업데이트하는 함수
  setSelectedDay: (day) => {
    set((state) => {
      const { year, month } = state.selectedDate;
      const { dayOfWeek } = calculateNewDate(year, month, day);
      return {
        selectedDate: { ...state.selectedDate, day, dayOfWeek },
      };
    });
  },

  // 이전 달로 이동하는 함수
  handlePrevMonth: () => {
    set((state) => {
      let { year, month, day } = state.selectedDate;
      const today = new Date();
      const currentYear = today.getFullYear();
      const currentMonth = today.getMonth() + 1;
      const currentDay = today.getDate();

      month -= 1;

      if (month === 0) {
        year -= 1;
        month = 12;
      }

      if (year === currentYear && month === currentMonth) {
        day = currentDay;
      }

      const { dayOfWeek } = calculateNewDate(year, month, day);
      return {
        selectedDate: { ...state.selectedDate, year, month, day, dayOfWeek },
      };
    });
  },

  // 다음 달로 이동하는 함수
  handleNextMonth: () => {
    set((state) => {
      let { year, month, day } = state.selectedDate;
      const currentMonth = new Date().getMonth() + 1; // 현재 월

      month += 1;

      if (month === 13) {
        year += 1;
        month = 1;
      }

      if (month !== currentMonth) {
        day = 1;
      }

      const { dayOfWeek } = calculateNewDate(year, month, day);

      return {
        selectedDate: { ...state.selectedDate, year, month, day, dayOfWeek },
      };
    });
  },
}));

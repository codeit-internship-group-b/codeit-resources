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

interface SelectedDate {
  year: number;
  month: number;
  day: number;
  dayOfWeek: string;
}

const parseDateFromUrl = (searchParams: URLSearchParams): SelectedDate => {
  const urlDate = searchParams.get("date");
  if (urlDate) {
    const parsedDate = new Date(urlDate);
    if (!isNaN(parsedDate.getTime())) {
      return {
        year: parsedDate.getFullYear(),
        month: parsedDate.getMonth() + 1,
        day: parsedDate.getDate(),
        dayOfWeek: getDayOfWeek(parsedDate),
      };
    }
  }
  // URL에 유효한 date가 없으면 오늘 날짜 반환
  const today = new Date();
  return {
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: today.getDate(),
    dayOfWeek: getDayOfWeek(today),
  };
};

export const useDateStore = create<DateStore>((set) => ({
  selectedDate: parseDateFromUrl(new URLSearchParams(window.location.search)), // URL에서 date를 읽어와 초기화

  // selectedDate: {
  //   year: new Date().getFullYear(),
  //   month: new Date().getMonth() + 1,
  //   day: new Date().getDate(),
  //   dayOfWeek: getDayOfWeek(new Date()),
  // },

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
      let { year, month } = state.selectedDate;
      const { day } = state.selectedDate;
      month -= 1;

      if (month === 0) {
        year -= 1;
        month = 12;
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
      let { year, month } = state.selectedDate;
      const { day } = state.selectedDate;
      month += 1;

      if (month === 13) {
        year += 1;
        month = 1;
      }

      const { dayOfWeek } = calculateNewDate(year, month, day);
      return {
        selectedDate: { ...state.selectedDate, year, month, day, dayOfWeek },
      };
    });
  },
}));

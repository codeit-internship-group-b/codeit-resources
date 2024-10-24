// types.ts
export interface Schedule {
  id: string;
  date: string;
  start_time: string; // HH:mm 형식
  end_time: string; // HH:mm 형식
  title: string;
  userId: string;
}

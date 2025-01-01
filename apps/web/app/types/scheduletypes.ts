export interface Room {
  id: string;
  title: string;
  schedules: Schedule[];
}
export interface Schedule {
  id: string;
  date: string;
  start_time: string;
  end_time: string;
  title: string;
  userId: string;
}

export interface ScheduleDate {
  rooms: Room[];
  selectedDate: string;
}

export interface ScheduleFormData {
  meetingTitle: string;
  selectedRoom: SelectedRoom | null; // name과 _id를 포함
  startTime: string;
  customStartTime: string;
  endTime: string;
  customEndTime: string;
  participants: string[];
}

export interface SelectedRoom {
  name: string;
  _id: string;
}

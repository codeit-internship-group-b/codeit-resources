export const FORM_LABELS = {
  meetingTitle: "미팅 제목",
  meetingTitlePlaceholder: "미팅 제목을 입력해주세요.",
  selectRoom: "회의실 선택",
  selectStartTime: "시작 시간",
  selectEndTime: "종료 시간",
  selectAttendees: "참여자 선택",
};

export const BUTTON_TEXT = {
  delete: "삭제하기",
  update: "수정하기",
  create: "예약하기",
  cancel: "취소하기",
};

export const ERROR_MESSAGES = {
  meetingTitleRequired: "미팅 제목을 입력해주세요.",
  timeRequired: "시작 시간과 종료 시간을 모두 선택해주세요.",
  endTimeMinimum: "종료 시간은 시작 시간보다 최소 30분 이후여야 합니다.",
  timeOverlap: "선택한 시간에 이미 예약이 있습니다.",
  userFetchError: "사용자 데이터를 불러오는 데 실패했습니다.",
  roomFetchError: "회의실 정보를 불러오는 데 실패했습니다.",
};

export const QUERY_KEYS = {
  meetings: (date: string, type: string) => ["meetings", date, type] as const,
  rooms: "Rooms",
  allUsers: "AllUsers",
};

export const TIME_INTERVAL = {
  minimumDifference: 30,
};

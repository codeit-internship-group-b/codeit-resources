/* eslint-disable @typescript-eslint/naming-convention */

export enum ModalType {
  CREATE_UPDATE = "create/update",
  DELETE = "delete",
}

export const NOTIFICATION_MESSAGES = {
  create: "회의실이 예약되었습니다.",
  update: "예약이 수정되었습니다.",
  delete: "예약이 삭제되었습니다.",
};

export const QUERY_KEYS = {
  meetings: (date: string, type: string) => ["meetings", date, type] as const,
};

export const MODAL_TEXT = {
  titles: {
    [ModalType.CREATE_UPDATE]: "회의실을 예약하시겠어요?",
    [ModalType.DELETE]: "예약을 삭제하시겠어요?",
    edit: "회의실 예약을 수정하시겠어요?",
  },
  contents: {
    [ModalType.CREATE_UPDATE]: "선택한 시간대의 회의실이 예약됩니다.",
    edit: "선택한 시간대의 회의실 예약이 수정됩니다.",
    [ModalType.DELETE]: "선택한 예약이 삭제됩니다.",
  },
  confirmButtonNames: {
    [ModalType.CREATE_UPDATE]: "예약하기",
    edit: "수정하기",
    [ModalType.DELETE]: "삭제하기",
  },
  cancelButtonName: "취소하기",
};

export const MEMBER_FORM_MESSAGES = {
  VALIDATION: {
    NAME: {
      REQUIRED: "이름을 입력해주세요",
      MIN_LENGTH: "이름은 2자 이상이어야 합니다",
    },
    EMAIL: {
      REQUIRED: "이메일을 입력해주세요",
      PATTERN: "올바른 이메일 형식이 아닙니다",
    },
    ROLE: {
      REQUIRED: "역할을 선택해주세요",
    },
  },

  BUTTON: {
    SUBMIT: {
      ADD: "추가하기",
      UPDATE: "수정하기",
      PROCESSING: "처리 중...",
    },
    WITHDRAW: "탈퇴하기",
    UPLOAD_PHOTO: "사진 업로드",
    CANCEL: "취소하기",
  },

  TITLE: {
    ADD: "멤버 추가",
    UPDATE: "멤버 수정",
  },

  IMAGE: {
    DEFAULT_ALT: "기본 프로필 이미지",
    PREVIEW_ALT: "프로필 이미지 미리보기",
  },

  PLACEHOLDER: {
    NAME: "멤버 이름",
    EMAIL: "멤버 이메일",
    TEAM: "팀",
  },
} as const;

export const MODAL_MESSAGES = {
  WITHDRAW: {
    TITLE: (name: string) => `'${name}'님을 탈퇴시킬까요?`,
    DESCRIPTION: "탈퇴 시, 해당 멤버는 더 이상 목록에서 보이지 않으며, 해당 계정으로 로그인이 불가합니다.",
    CONFIRM: "탈퇴하기",
    CANCEL: "취소하기",
  },
} as const;

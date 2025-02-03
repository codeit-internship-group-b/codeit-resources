import { TItemType } from "@repo/types/src/itemType";
import { SidePanelFormData } from "@repo/types/src/membersType";

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `/sign-in`, // 로그인
  },
  USERS: {
    GET_ALL: `/users`, // 전체 유저 조회
    GET_USER: () => `/users/me`,
    PATCH_USER: (userId: string | number) => `/users/${userId}`, // 유저 정보 수정
    DELETE_USER: (userId: string | number) => `/users/${userId}`, // 유저 삭제
    CREATE_USER: `/users/create`, // 유저 생성
    ME_IMAGE: `/users/me/image`, // 이미지 변경
    ME_PASSWORD: `/users/me/password`, // 비밀번호 변경
  },
  RESERVATION: {
    GET_USER_RESERVATIONS: (userId: string | number) => `/reservations/dashboard/${userId}`, // 유저별 예약 조회
    GET_RESERVATIONS_BY_TYPE_AND_DATE: (itemType: string, date: string) => `/reservations/${itemType}?date=${date}`, // 타입 및 날짜로 예약 조회
    CREATE_RESERVATION: (itemId: string | number) => `/reservations/${itemId}`, // 예약 생성
    UPDATE_RESERVATION: (reservationId: string | number) => `/reservations/${reservationId}`, // 예약 수정
    DELETE_RESERVATION: (reservationId: string | number) => `/reservations/${reservationId}`, // 예약 삭제
  },
  ITEMS: {
    GET_ALL: (itemType?: TItemType) => `/items${itemType ? `/${itemType}` : ""}`, // 아이템 전체 조회 (optional itemType)
    CREATE_ITEM: (itemType: TItemType) => `/items/${itemType}`, // 아이템 생성
    UPDATE_ITEM: (itemId: string) => `/items/${itemId}`, // 아이템 수정
    DELETE_ITEM: (itemId: string) => `/items/${itemId}`, // 아이템 삭제
  },
  CATEGORIES: {
    GET_ALL: `/categories`, // 카테고리 전체 조회
    CREATE_CATEGORY: `/categories`, // 카테고리 생성
    UPDATE_CATEGORY: (categoryId: string | number) => `/categories/${categoryId}`, // 카테고리 이름 수정
    DELETE_CATEGORY: (categoryId: string | number) => `/categories/${categoryId}`, // 카테고리 삭제 (하위 아이템 전체 삭제됨)
  },
  TEAMS: {
    GET_ALL: "/teams", // 팀 전체 조회
    UPDATE_TEAM_NAME: (teamId: string) => `/teams/${teamId}`, // 팀 이름 수정
    DELETE_TEAM: (teamId: string) => `/teams/${teamId}`, // 팀 삭제
    CREATE_TEAM: "/teams", // 팀 생성
    UPDATE_TEAM_ORDER: "/teams/order", // 드래그 앤 드랍
  },
};

export const IMAGE_CONFIG = {
  TYPES: ["image/jpeg", "image/jpg", "image/png"], // 이미지 타입
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  BLUR_DATA_URL:
    "data:image/png;base64,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",
};

export const IMAGE_SIZES = {
  MD: 120,
};

export const PAGE_SIZE = 20;

export const WEBVIEW_MESSAGE_TYPES = {
  AUTO_LOGIN: "AUTO_LOGIN",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  SIGN_OUT_SUCCESS: "SIGN_OUT_SUCCESS",
  SIGN_IN_ERROR: "SIGN_IN_ERROR",
  ROUTER_EVENT: "ROUTER_EVENT",
};

export const DEFAULT_MEMBER_FORM_VALUES: SidePanelFormData = {
  role: "member",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

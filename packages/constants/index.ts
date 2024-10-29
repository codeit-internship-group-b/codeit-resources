import { TItemType } from "@repo/types/src/itemType";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ??
  (() => {
    throw new Error("NEXT_PUBLIC_API_URL 환경 변수가 설정되지 않았습니다.");
  })();

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `${API_BASE_URL}/sign-in`, // 로그인
  },
  USERS: {
    GET_ALL: `${API_BASE_URL}/users`, // 전체 유저 조회
    GET_USER: (userId: string | number) => `${API_BASE_URL}/users/${userId}`, // id로 유저 조회
    PATCH_USER: (userId: string | number) => `${API_BASE_URL}/users/${userId}`, // 유저 정보 수정
    DELETE_USER: (userId: string | number) => `${API_BASE_URL}/users/${userId}`, // 유저 삭제
    CREATE_USER: `${API_BASE_URL}/users/`, // 유저 생성
    ME_IMAGE: `${API_BASE_URL}/users/me/image`, // 이미지 변경
    ME_PASSWORD: `${API_BASE_URL}/users/me/password`, // 비밀번호 변경
  },
  RESERVATION: {
    GET_USER_RESERVATIONS: (userId: string | number) => `${API_BASE_URL}/reservations/dashboard/${userId}`, // 유저별 예약 조회
    GET_RESERVATIONS_BY_TYPE_AND_DATE: (itemType: string, date?: string) =>
      `${API_BASE_URL}/reservations/${itemType}${date ? `?date=${date}` : ""}`, // 타입 및 날짜로 예약 조회
    CREATE_RESERVATION: (itemId: string | number) => `${API_BASE_URL}/reservations/${itemId}`, // 예약 생성
    UPDATE_RESERVATION: (reservationId: string | number) => `${API_BASE_URL}/reservations/${reservationId}`, // 예약 수정
    DELETE_RESERVATION: (reservationId: string | number) => `${API_BASE_URL}/reservations/${reservationId}`, // 예약 삭제
  },
  ITEMS: {
    GET_ALL: (itemType?: TItemType) => `${API_BASE_URL}/items${itemType ? `/${itemType}` : ""}`, // 아이템 전체 조회 (optional itemType)
    CREATE_ITEM: (itemType: TItemType) => `${API_BASE_URL}/items/${itemType}`, // 아이템 생성
    UPDATE_ITEM: (itemId: string | number) => `${API_BASE_URL}/items/${itemId}`, // 아이템 수정
    DELETE_ITEM: (itemId: string | number) => `${API_BASE_URL}/items/${itemId}`, // 아이템 삭제
  },
  CATEGORIES: {
    GET_ALL: `${API_BASE_URL}/categories`, // 카테고리 전체 조회
    CREATE_CATEGORY: `${API_BASE_URL}/categories`, // 카테고리 생성
    UPDATE_CATEGORY: (categoryId: string | number) => `${API_BASE_URL}/categories/${categoryId}`, // 카테고리 이름 수정
    DELETE_CATEGORY: (categoryId: string | number) => `${API_BASE_URL}/categories/${categoryId}`, // 카테고리 삭제 (하위 아이템 전체 삭제됨)
  },
};

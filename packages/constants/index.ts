import { type TItemType } from "@repo/types";

export const API_ENDPOINTS = {
  AUTH: {
    SIGN_IN: `/sign-in`, // 로그인
  },
  USERS: {
    GET_ALL: `/users`, // 전체 유저 조회
    GET_USER: (userId: string | number) => `/users/${userId}`, // id로 유저 조회
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
    CREATE_ITEM: `/items`, // 아이템 생성
    UPDATE_ITEM: (itemId: string | number) => `/items/${itemId}`, // 아이템 수정
    DELETE_ITEM: (itemId: string | number) => `/items/${itemId}`, // 아이템 삭제
  },
};

import { API_ENDPOINTS } from "@repo/constants";
import { type FieldValues } from "react-hook-form";
import axios, { type AxiosResponse } from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";

const isWebView = typeof window !== "undefined" && window.ReactNativeWebView;
const API_URL = isWebView ? process.env.NEXT_PUBLIC_ANDROID_API_URL : process.env.NEXT_PUBLIC_API_URL;

const callSignInAPI = async (payload: FieldValues | string): Promise<AxiosResponse<SignInResponseType>> => {
  return axios.post<SignInResponseType>(`${API_URL}${API_ENDPOINTS.AUTH.SIGN_IN}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

// 로그인 API (데이터 반환)
export const postSignIn = async (payload: FieldValues): Promise<SignInResponseType> => {
  const { data } = await callSignInAPI(payload);
  return data;
};

// 토큰 검증 API (상태 반환)
export const validateToken = async (payload: string): Promise<boolean> => {
  const { status } = await callSignInAPI(payload);
  return status === 200;
};

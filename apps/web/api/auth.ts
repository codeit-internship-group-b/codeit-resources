import { API_ENDPOINTS } from "@repo/constants";
import { type FieldValues } from "react-hook-form";
import axios from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";

const isWebView = typeof window !== "undefined" && window.ReactNativeWebView;
const API_URL = isWebView ? process.env.NEXT_PUBLIC_ANDROID_API_URL : process.env.NEXT_PUBLIC_API_URL;

export const postSignIn = async (payload: FieldValues): Promise<SignInResponseType> => {
  const { data } = await axios.post<SignInResponseType>(`${API_URL}${API_ENDPOINTS.AUTH.SIGN_IN}`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });

  return data;
};

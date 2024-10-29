import { API_ENDPOINTS } from "@repo/constants";
import { type FieldValues } from "react-hook-form";
import axios from "axios";

interface ResponseAPIType<T> {
  accessToken?: T;
  message?: string;
  status?: "success" | "error";
}

export const postSignIn = async (payload: FieldValues): Promise<ResponseAPIType<string>> => {
  const { data } = await axios.post<ResponseAPIType<string>>(
    `${process.env.NEXT_PUBLIC_API_URL}${API_ENDPOINTS.AUTH.SIGN_IN}`,
    payload,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return data;
};

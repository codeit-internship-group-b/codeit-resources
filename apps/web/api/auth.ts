import { API_ENDPOINTS } from "@repo/constants";
import { type FieldValues } from "react-hook-form";
import axios from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";

export const postSignIn = async (payload: FieldValues): Promise<SignInResponseType<string>> => {
  const { data } = await axios.post<SignInResponseType<string>>(
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

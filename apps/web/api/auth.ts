import { API_ENDPOINTS } from "@repo/constants";
import { type FieldValues } from "react-hook-form";
import axios from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";
import { getWebApiUrl } from "@/app/utils/getWebApiUrl";

const baseUrl = getWebApiUrl();

export const postSignIn = async (payload: FieldValues): Promise<SignInResponseType> => {
  const { data } = await axios.post<SignInResponseType>(`${baseUrl}${API_ENDPOINTS.AUTH.SIGN_IN}`, payload);

  return data;
};

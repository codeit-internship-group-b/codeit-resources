import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { setCookie } from "cookies-next";
import { notify } from "@ui/index";
import { type AxiosError } from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";
import { postSignIn } from "@/app/api/auth";

export const useSignIn = (): UseMutationResult<
  SignInResponseType<string>,
  AxiosError<{ message: string }>,
  FieldValues
> => {
  return useMutation({
    mutationFn: (payload: FieldValues) => postSignIn(payload),
    onSuccess: (res) => {
      setCookie("accessToken", res.accessToken);
      if (res.message) notify({ type: "success", message: res.message });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
  });
};

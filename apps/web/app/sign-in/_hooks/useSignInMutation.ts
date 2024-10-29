import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { setCookie } from "cookies-next";
import { notify } from "@ui/index";
import { type AxiosError } from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { postSignIn } from "@/app/api/auth";

export const useSignInMutation = (): UseMutationResult<
  SignInResponseType<string>,
  AxiosError<{ message?: string }>,
  FieldValues
> => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FieldValues) => postSignIn(payload),
    onSuccess: (res) => {
      setCookie("accessToken", res.accessToken);
      queryClient.setQueryData(["userData"], res.user);
      if (typeof res.message === "string") notify({ type: "success", message: res.message });

      setTimeout(() => {
        router.replace(PAGE_NAME.DASHBOARD);
      }, 1000);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
  });
};

import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { setCookie } from "cookies-next";
import { type AxiosError } from "axios";
import { type SignInResponseType } from "@repo/types/src/responseType";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { notify } from "@/app/store/useToastStore";
import { postSignIn } from "@/api/auth";
import { useAuthStore } from "@/src/stores/useAuthStore";

export const useSignInMutation = (): UseMutationResult<
  SignInResponseType<string>,
  AxiosError<{ message?: string }>,
  FieldValues
> => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (payload: FieldValues) => postSignIn(payload),
    onSuccess: (res) => {
      // accessToken을 client cookie에 저장
      setCookie("accessToken", res.accessToken);
      // user 정보 캐싱
      queryClient.setQueryData(["userResponse"], res.user);
      // localStorage 및 store에 저장
      if (res.user) {
        login(res.user);
      }

      // 피드백 토스트
      if (typeof res.message === "string") notify("success", res.message);

      setTimeout(() => {
        router.replace(PAGE_NAME.DASHBOARD);
      }, 1000);
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify("error", errMessage);
    },
  });
};

import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { type AxiosError } from "axios";
import { type MessageResponse, type SignInResponseType } from "@repo/types/src/responseType";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { delay } from "es-toolkit";
import { notify } from "@/app/store/useToastStore";
import { postSignIn } from "@/api/auth";
import { useAuthStore } from "@/app/store/useAuthStore";
import { notifyMutationError } from "@/app/utils/notifyMutationError";
import { useIsReactNativeWebview } from "./useIsReactNativeWebview";
import { usePostMessageToRN } from "./usePostMessageToRN";

export const useSignInMutation = (): UseMutationResult<
  SignInResponseType,
  AxiosError<MessageResponse>,
  FieldValues
> => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuthStore();
  const isReactNativeWebview = useIsReactNativeWebview();
  const postMessageToRN = usePostMessageToRN();

  return useMutation({
    mutationFn: (payload: FieldValues) => postSignIn(payload),
    onSuccess: async (res) => {
      const { user, accessToken, message } = res;
      login(user, accessToken);
      queryClient.setQueryData(["userResponse"], user);
      notify("success", message);

      postMessageToRN({
        type: "LOGIN_SUCCESS",
        data: { user, accessToken },
      });

      if (!isReactNativeWebview) {
        // 화면전환 1초 지연
        await delay(1000);
        router.replace(PAGE_NAME.DASHBOARD);
      }
    },
    onError: (error) => {
      notifyMutationError(error);
    },
  });
};

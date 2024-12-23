import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { type FieldValues } from "react-hook-form";
import { type AxiosError } from "axios";
import { type MessageResponse, type SignInResponseType } from "@repo/types/src/responseType";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { notify } from "@/app/store/useToastStore";
import { postSignIn } from "@/api/auth";
import { useAuthStore } from "@/src/stores/useAuthStore";

export const useSignInMutation = (): UseMutationResult<
  SignInResponseType<string>,
  AxiosError<MessageResponse>,
  FieldValues
> => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { login } = useAuthStore();

  return useMutation({
    mutationFn: (payload: FieldValues) => postSignIn(payload),
    onSuccess: (res) => {
      const { user, accessToken, message } = res;
      if (accessToken && user) {
        login(user, accessToken);
        queryClient.setQueryData(["userResponse"], user);
        notify("success", message);
        setTimeout(() => {
          router.replace(PAGE_NAME.DASHBOARD);
        }, 1000);
      }
    },
    onError: (error) => {
      const errMessage = error.response?.data.message;
      if (errMessage) notify("error", errMessage);
    },
  });
};

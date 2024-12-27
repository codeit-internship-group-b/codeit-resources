import { type MessageResponse, type ChangePasswordPayload, type ResponseType, type IUser } from "@repo/types";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { patchUserImage, patchUserPassword } from "@/api/users";
import { notify } from "@/app/store/useToastStore";
import { notifyMutationError } from "@/src/utils/notifyMutationError";
import { QUERY_KEYS } from "@/lib/queryKey";

export const useChangeUserPasswordMutation = (): UseMutationResult<
  MessageResponse,
  AxiosError<MessageResponse>,
  ChangePasswordPayload
> => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => patchUserPassword(payload),
    onSuccess: (res) => {
      notify("success", res.message);
    },
    onError: (error) => {
      notifyMutationError(error);
    },
  });
};

export const useChangeUserImageMutation = (): UseMutationResult<
  ResponseType<IUser>,
  AxiosError<MessageResponse>,
  FormData
> => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (formData: FormData) => patchUserImage(formData),
    onSuccess: (res) => {
      void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.USER });
      notify("success", res.message);
    },
    onError: (error) => {
      notifyMutationError(error);
    },
  });
};

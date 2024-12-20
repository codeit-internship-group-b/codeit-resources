import { type MessageResponse, type ChangePasswordPayload } from "@repo/types";
import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { type AxiosError } from "axios";
import { patchUserPassword } from "@/api/users";

export const useChangeUserPasswordMutation = (): UseMutationResult<
  MessageResponse,
  AxiosError<MessageResponse>,
  ChangePasswordPayload
> => {
  return useMutation({
    mutationFn: (payload: ChangePasswordPayload) => patchUserPassword(payload),
    onSuccess: (res) => {
      notify({ type: "success", message: res.message });
    },
    onError: (error) => {
      const errMessage = error.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
  });
};

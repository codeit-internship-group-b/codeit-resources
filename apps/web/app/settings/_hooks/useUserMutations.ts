import { type MessageResponse, type ChangePasswordPayload, type ResponseType, type IUser } from "@repo/types";
import { useMutation, useQueryClient, type UseMutationResult } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { patchUserImage, patchUserPassword } from "@/api/users";
import { notify } from "@/app/store/useToastStore";

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
      const errMessage = error.response?.data.message;
      if (errMessage) notify("error", errMessage);
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
      void queryClient.invalidateQueries({ queryKey: ["userResponse"] });
      notify("success", res.message);
    },
    onError: (error) => {
      const errMessage = error.response?.data.message;
      if (errMessage) notify("error", errMessage);
    },
  });
};

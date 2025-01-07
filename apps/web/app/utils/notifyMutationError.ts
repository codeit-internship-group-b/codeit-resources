import { type MessageResponse } from "@repo/types";
import { type AxiosError } from "axios";
import { notify } from "@/app/store/useToastStore";

export const notifyMutationError = (
  error: AxiosError<MessageResponse>,
  message = "작업 중 오류가 발생했습니다.",
): void => {
  const errMessage = error.response?.data.message ?? message;
  notify("error", errMessage);
};

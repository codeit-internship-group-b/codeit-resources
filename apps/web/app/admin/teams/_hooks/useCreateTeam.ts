import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { type AxiosError } from "axios";
import { type ResponseType, type ITeam } from "@repo/types";
import { postCreateTeam } from "@/api/teams";

export const useCreateTeam = (): UseMutationResult<ResponseType<ITeam>, AxiosError<{ message?: string }>, ITeam> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (name: ITeam) => postCreateTeam(name),
    onSuccess: (res) => {
      // 토스트 피드백
      if (typeof res.message === "string") notify({ type: "success", message: res.message });
      // query key 초기화
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
    },
    onError: (error) => {
      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
  });
};

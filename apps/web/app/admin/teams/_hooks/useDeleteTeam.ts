import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { type AxiosError } from "axios";
import { deleteTeam } from "@/api/teams";

interface DeleteResponse {
  message: string;
}

export const useDeleteTeam = (): UseMutationResult<DeleteResponse, AxiosError<{ message?: string }>, string> => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (teamId: string) => deleteTeam(teamId),
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

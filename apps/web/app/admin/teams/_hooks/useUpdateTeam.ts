import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { type TeamType } from "@repo/types";
import { type AxiosError } from "axios";
import { notify } from "@ui/index";
import { useRef } from "react";
import { updateTeam } from "@/api/teams";

interface UpdateRequest {
  teamId: string;
  newName: string;
}

interface MessageResponse {
  message: string;
}

export const useUpdateTeam = (): UseMutationResult<MessageResponse, AxiosError<{ message: string }>, UpdateRequest> => {
  const queryClient = useQueryClient();
  const prevTeamsRef = useRef<TeamType[] | undefined>();

  return useMutation({
    mutationFn: ({ teamId, newName }: UpdateRequest) => updateTeam({ teamId, newName }),

    // 낙관적 업데이트 적용 === optimistic update
    onMutate: ({ teamId, newName }) => {
      void queryClient.cancelQueries({ queryKey: ["teamsResponse"] });
      // 이전 상태 저장
      prevTeamsRef.current = queryClient.getQueryData<TeamType[]>(["teamsResponse"]);
      // 팀 이름 수정
      void queryClient.setQueryData<TeamType[]>(["teamsResponse"], (oldTeams) =>
        // 변수 스코프 이슈로 team === element 사용
        oldTeams?.map((element) => (element._id === teamId ? { ...element, name: newName } : element)),
      );
    },

    onSuccess: (res) => {
      // 토스트 피드백
      if (typeof res.message === "string") notify({ type: "success", message: res.message });
    },
    onError: (error) => {
      if (prevTeamsRef.current) void queryClient.setQueryData<TeamType[]>(["teamsResponse"], prevTeamsRef.current);

      const err = error as AxiosError<{ message: string }>;
      const errMessage = err.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
    // finally 동작
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
    },
  });
};

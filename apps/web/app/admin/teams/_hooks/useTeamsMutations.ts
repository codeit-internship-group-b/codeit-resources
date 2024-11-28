import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { type FieldValues, useForm } from "react-hook-form";
import { type AxiosError } from "axios";
import { type ResponseType, type ITeam, type TeamType } from "@repo/types";
import { useRef } from "react";
import { deleteTeam, postCreateTeam, updateTeam } from "@/api/teams";

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

export const useCreateForm = (): FieldValues => {
  return useForm({
    mode: "onChange",
    defaultValues: {
      teamName: "",
    },
  });
};

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

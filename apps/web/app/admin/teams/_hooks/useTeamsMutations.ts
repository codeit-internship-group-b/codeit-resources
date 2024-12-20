import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { type FieldValues, useForm } from "react-hook-form";
import { type AxiosError } from "axios";
import { type ResponseType, type ITeam, type TeamType, type MessageResponse } from "@repo/types";
import { useRef } from "react";
import { deleteTeam, postCreateTeam, updateTeamName, updateTeamOrder } from "@/api/teams";
import { useDebouncedCallback } from "./useDebounceCallback";

export const useCreateTeam = (
  onClose: () => void,
): UseMutationResult<ResponseType<ITeam>, AxiosError<MessageResponse>, ITeam> => {
  const queryClient = useQueryClient();
  const debouncedOnClose = useDebouncedCallback(onClose, 800);

  return useMutation({
    mutationFn: (name: ITeam) => postCreateTeam(name),
    onSuccess: (res) => {
      // 토스트 피드백
      if (typeof res.message === "string") notify({ type: "success", message: res.message });
      // query key 초기화
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
      // modal close
      debouncedOnClose();
    },
    onError: (error) => {
      const errMessage = error.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
  });
};

export const useCreateForm = (): FieldValues => {
  return useForm({
    mode: "onBlur",
    defaultValues: {
      teamName: "",
    },
  });
};

export const useDeleteTeam = (): UseMutationResult<MessageResponse, AxiosError<MessageResponse>, string> => {
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
      const errMessage = error.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
  });
};

interface UpdateRequest {
  teamId: string;
  newName: string;
}

export const useUpdateTeamName = (): UseMutationResult<MessageResponse, AxiosError<MessageResponse>, UpdateRequest> => {
  const queryClient = useQueryClient();
  const prevTeamsRef = useRef<TeamType[] | undefined>();

  return useMutation({
    mutationFn: ({ teamId, newName }: UpdateRequest) => updateTeamName({ teamId, newName }),

    // 낙관적 업데이트 적용 === optimistic update
    onMutate: ({ teamId, newName }) => {
      void queryClient.cancelQueries({ queryKey: ["teamsResponse"] });
      // 이전 상태 저장
      prevTeamsRef.current = queryClient.getQueryData<TeamType[]>(["teamsResponse"]);
      // 팀 이름 수정
      void queryClient.setQueryData<TeamType[]>(["teamsResponse"], (oldTeams) =>
        oldTeams?.map((oldTeam) => (oldTeam._id === teamId ? { ...oldTeam, name: newName } : oldTeam)),
      );
    },

    onSuccess: (res) => {
      // 토스트 피드백
      if (typeof res.message === "string") notify({ type: "success", message: res.message });
    },
    onError: (error) => {
      if (prevTeamsRef.current) void queryClient.setQueryData<TeamType[]>(["teamsResponse"], prevTeamsRef.current);
      const errMessage = error.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
    // finally 동작
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
    },
  });
};

export const useUpdateTeamOrder = (
  updatedTeams: TeamType[],
): UseMutationResult<ResponseType<TeamType[]>, AxiosError<MessageResponse>, TeamType[]> => {
  const queryClient = useQueryClient();
  const prevTeamsRef = useRef<TeamType[] | undefined>();

  return useMutation({
    mutationFn: updateTeamOrder,
    onMutate: () => {
      void queryClient.cancelQueries({ queryKey: ["teamsResponse"] });
      prevTeamsRef.current = queryClient.getQueryData<TeamType[]>(["teamsResponse"]);
      void queryClient.setQueryData<TeamType[]>(["teamsResponse"], () => updatedTeams);
    },

    onError: (error) => {
      if (prevTeamsRef.current) void queryClient.setQueryData<TeamType[]>(["teamsResponse"], prevTeamsRef.current);
      const errMessage = error.response?.data.message;
      if (errMessage) notify({ type: "error", message: errMessage });
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
    },
  });
};

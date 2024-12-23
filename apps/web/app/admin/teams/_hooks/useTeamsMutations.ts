import { useMutation, type UseMutationResult, useQueryClient } from "@tanstack/react-query";
import { type FieldValues, useForm } from "react-hook-form";
import { type AxiosError } from "axios";
import { type ResponseType, type ITeam, type TeamType, type MessageResponse } from "@repo/types";
import { useRef } from "react";
import { deleteTeam, postCreateTeam, updateTeamName, updateTeamOrder } from "@/api/teams";
import { notify } from "@/app/store/useToastStore";
import { notifyMutationError } from "@/src/utils/notifyMutationError";
import { useDebouncedCallback } from "./useDebounceCallback";

export const useCreateTeam = (
  onClose: () => void,
): UseMutationResult<ResponseType<ITeam>, AxiosError<MessageResponse>, ITeam> => {
  const queryClient = useQueryClient();
  const debouncedOnClose = useDebouncedCallback(onClose, 800);

  return useMutation({
    mutationFn: (name: ITeam) => postCreateTeam(name),
    onSuccess: (res) => {
      notify("success", res.message);
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });

      // modal close
      debouncedOnClose();
    },
    onError: (error) => {
      notifyMutationError(error);
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
      notify("success", res.message);
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
    },
    onError: (error) => {
      notifyMutationError(error);
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

    onMutate: ({ teamId, newName }) => {
      void queryClient.cancelQueries({ queryKey: ["teamsResponse"] });
      prevTeamsRef.current = queryClient.getQueryData<TeamType[]>(["teamsResponse"]);
      void queryClient.setQueryData<TeamType[]>(["teamsResponse"], (oldTeams) =>
        oldTeams?.map((oldTeam) => (oldTeam._id === teamId ? { ...oldTeam, name: newName } : oldTeam)),
      );
    },

    onSuccess: (res) => {
      notify("success", res.message);
    },
    onError: (error) => {
      if (prevTeamsRef.current) void queryClient.setQueryData<TeamType[]>(["teamsResponse"], prevTeamsRef.current);
      notifyMutationError(error);
    },
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
      notifyMutationError(error);
    },
    onSettled: () => {
      void queryClient.invalidateQueries({ queryKey: ["teamsResponse"] });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios, { type AxiosError } from "axios";
import type { ResponseWithMessage } from "@repo/types/src/membersType";
import { postMember, patchMember, deleteMember } from "@/api/members";
import { notify } from "@/app/store/useToastStore";
import { notifyMutationError } from "@/src/utils/notifyMutationError";
import { QUERY_KEYS } from "@/lib/queryKey";

interface UpdateMemberParams {
  id: string;
  data: FormData;
}

interface MemberMutationsReturn {
  createMember: (formData: FormData) => void;
  updateMember: (params: UpdateMemberParams) => void;
  removeMember: (userId: string) => void;
  isPending: boolean;
}

interface UseMemberMutationsProps {
  onSuccess?: () => void;
}

export function useMembersMutations({ onSuccess }: UseMemberMutationsProps = {}): MemberMutationsReturn {
  const queryClient = useQueryClient();

  const handleSuccess = (res: ResponseWithMessage): void => {
    notify("success", res.message);
    void queryClient.invalidateQueries({ queryKey: QUERY_KEYS.MEMBERS.ALL });
    onSuccess?.();
  };

  const handleError = (error: Error | AxiosError<ResponseWithMessage>): void => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        throw error;
      }

      const err = error as AxiosError<ResponseWithMessage>;
      notifyMutationError(err);
    } else {
      throw error;
    }
  };

  const { mutate: createMember, isPending: isCreateMemberPending } = useMutation({
    mutationFn: postMember,
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: updateMember, isPending: isUpdateMemberPending } = useMutation({
    mutationFn: ({ id, data }: UpdateMemberParams) => patchMember(id, data),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  const { mutate: removeMember, isPending: isRemoveMemberPending } = useMutation({
    mutationFn: (userId: string) => deleteMember(userId),
    onSuccess: handleSuccess,
    onError: handleError,
  });

  return {
    createMember,
    updateMember,
    removeMember,
    isPending: isCreateMemberPending || isUpdateMemberPending || isRemoveMemberPending,
  };
}

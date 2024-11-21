/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import axios, { type AxiosError } from "axios";
import type { MemberWithFileImage, ResponseWithMessage } from "@repo/types/src/membersType";
import { postMember, patchMember, deleteMember } from "@/api/members";

interface UpdateMemberParams {
  id: string;
  data: FormData;
}

interface HandleSubmitMutationParams {
  selectedMember: MemberWithFileImage | null;
  formData: FormData;
}

interface MemberMutationsReturn {
  createMember: (formData: FormData) => void;
  updateMember: (params: UpdateMemberParams) => void;
  removeMember: (userId: string) => void;
  handleSubmitMutation: ({ formData, selectedMember }: HandleSubmitMutationParams) => void;
  isPending: boolean;
}

interface UseMemberMutationsProps {
  onSuccess?: () => void;
}

export function useMembersMutations({ onSuccess }: UseMemberMutationsProps = {}): MemberMutationsReturn {
  const queryClient = useQueryClient();

  const handleSuccess = async (res: ResponseWithMessage): Promise<void> => {
    notify({
      type: "success",
      message: res.message,
    });
    await queryClient.invalidateQueries({ queryKey: ["members"] });
    onSuccess?.();
  };

  const handleError = (error: Error | AxiosError<ResponseWithMessage>): void => {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 500) {
        throw error;
      }

      notify({
        type: "error",
        message: error.response?.data.message,
      });
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

  const handleSubmitMutation = ({ formData, selectedMember }: HandleSubmitMutationParams): void => {
    if (selectedMember) {
      updateMember({ id: selectedMember._id, data: formData });
    } else {
      createMember(formData);
    }
  };

  return {
    createMember,
    updateMember,
    removeMember,
    handleSubmitMutation,
    isPending: isCreateMemberPending || isUpdateMemberPending || isRemoveMemberPending,
  };
}

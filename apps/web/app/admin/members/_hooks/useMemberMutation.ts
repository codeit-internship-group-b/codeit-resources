import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify } from "@ui/index";
import { TOAST_MESSAGES } from "@repo/ui/src/utils/constants/notificationMessage";
import { postMember, patchMember, deleteMember } from "@/api/members";
import type { MemberWithFileImage } from "../types";

interface UpdateMemberParams {
  id: string;
  data: FormData;
}

export interface HandleSubmitMutationParams {
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
  onSuccess: () => void;
}

export function useMemberMutations({ onSuccess }: UseMemberMutationsProps): MemberMutationsReturn {
  const queryClient = useQueryClient();

  const handleSuccess = async (): Promise<void> => {
    await queryClient.invalidateQueries({ queryKey: ["members"] });
    onSuccess();
  };

  const { mutate: createMember, isPending: isCreateMemberPending } = useMutation({
    mutationFn: postMember,
    onSuccess: async () => {
      notify({
        type: "success",
        message: TOAST_MESSAGES.MEMBER_ADD,
      });
      await handleSuccess();
    },
  });

  const { mutate: updateMember, isPending: isUpdateMemberPending } = useMutation({
    mutationFn: ({ id, data }: UpdateMemberParams) => patchMember(id, data),
    onSuccess: async () => {
      notify({
        type: "success",
        message: TOAST_MESSAGES.MEMBER_UPDATE,
      });

      await queryClient.invalidateQueries({
        queryKey: ["members"],
        exact: true, // 정확히 ["members"]와 일치하는 쿼리만 무효화
      });
      onSuccess();
    },
  });

  const { mutate: removeMember, isPending: isRemoveMemberPending } = useMutation({
    mutationFn: (userId: string) => deleteMember(userId),
    onSuccess: async () => {
      notify({
        type: "success",
        message: TOAST_MESSAGES.MEMBER_DELETE,
      });
      await handleSuccess();
    },
  });

  const handleSubmitMutation = ({ selectedMember, formData }: HandleSubmitMutationParams): void => {
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

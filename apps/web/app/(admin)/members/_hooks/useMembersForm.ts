import { type MemberWithFileImage, type SidePanelFormData } from "@repo/types/src/membersType";
import { useEffect } from "react";
import { useForm, type UseFormProps, type UseFormReturn } from "react-hook-form";
import { useMembersMutations } from "./useMembersMutations";

interface UseMembersForm extends UseFormProps {
  selectedMember: MemberWithFileImage | null;
  onClose: () => void;
}

interface UseMembersFormReturn extends UseFormReturn<SidePanelFormData> {
  onSubmit: (data: SidePanelFormData) => void;
  isPending: boolean;
}

const DEFAULT_VALUES: SidePanelFormData = {
  role: "member",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export const useMembersForm = ({ selectedMember, onClose }: UseMembersForm): UseMembersFormReturn => {
  const form = useForm({ defaultValues: DEFAULT_VALUES });
  const { reset } = form;
  const { updateMember, createMember, isPending } = useMembersMutations({
    onSuccess: () => {
      reset(DEFAULT_VALUES);
      onClose();
    },
  });

  const createMemberFormData = (data: SidePanelFormData): FormData => {
    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("name", data.name);
    formData.append("email", data.email);

    data.teams.forEach((team) => {
      formData.append("teams[]", team);
    });

    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }

    return formData;
  };

  const onSubmit = (data: SidePanelFormData): void => {
    if (isPending) return;

    const formData = createMemberFormData(data);

    if (selectedMember) {
      updateMember({ id: selectedMember._id, data: formData });
      return;
    }

    createMember(formData);
  };

  useEffect(() => {
    if (selectedMember) {
      const { role, name, email, teams, profileImage } = selectedMember;

      reset({
        role,
        name,
        email,
        teams,
        profileImage: profileImage ?? null,
      });
    } else {
      reset(DEFAULT_VALUES);
    }
  }, [selectedMember, reset]);

  return { onSubmit, isPending, ...form };
};

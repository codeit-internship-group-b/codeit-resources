import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import { ROLE_LABELS, type RoleOption, type MemberWithFileImage } from "@repo/types/src/membersType";
import { useEffect } from "react";
import type { FormImageType, ImageFileType } from "@/app/types/ImageType";
import { useMembersMutations } from "../../_hooks/useMembersMutations";
import { MembersSchema, type MembersType } from "../../_schemas/Form.schema";
import ProfileImageUploader from "./ProfileImageUploader";
import TeamDropdown from "./TeamDropdown";

export const DEFAULT_MEMBER_FORM_VALUES: MembersType = {
  role: "member",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export interface MemberFormProps {
  selectedMember: MemberWithFileImage | null;
  onClose: () => void;
}

export default function MemberForm({ selectedMember, onClose }: MemberFormProps): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm({ defaultValues: DEFAULT_MEMBER_FORM_VALUES, resolver: zodResolver(MembersSchema) });
  const { updateMember, createMember, isPending } = useMembersMutations({
    onSuccess: () => {
      reset(DEFAULT_MEMBER_FORM_VALUES);
      onClose();
    },
  });

  const getRoleDisplay = (value: RoleOption): string => {
    return ROLE_LABELS[value];
  };

  const getRoleValue = (displayText: string): RoleOption => {
    const entry = Object.entries(ROLE_LABELS).find(([_, value]) => value === displayText);

    return entry?.[0] as RoleOption;
  };

  const getCurrentImage = (): FormImageType => {
    const profileImage = watch("profileImage");

    return profileImage;
  };

  const handleImageChange = (file: ImageFileType): void => {
    setValue("profileImage", file);
  };

  const getButtonText = (): string => {
    return selectedMember ? MEMBER_FORM_MESSAGES.BUTTON.SUBMIT.UPDATE : MEMBER_FORM_MESSAGES.BUTTON.SUBMIT.ADD;
  };

  const createMemberFormData = (data: MembersType): FormData => {
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

  const onSubmit = (data: MembersType): void => {
    if (isPending) return;

    const formData = createMemberFormData(data);
    if (selectedMember) {
      updateMember({ id: selectedMember._id, data: formData });
    } else {
      createMember(formData);
    }
  };

  useEffect(() => {
    if (selectedMember) {
      reset({ ...selectedMember });
    } else {
      reset(DEFAULT_MEMBER_FORM_VALUES);
    }
  }, [reset, selectedMember]);

  return (
    <form className="flex h-full flex-col justify-between" onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
      <div>
        <div className="w-154 mb-24">
          <Controller
            name="role"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Radio.Group
                value={getRoleDisplay(value)}
                onChange={(displayText) => {
                  onChange(getRoleValue(displayText));
                }}
              >
                <Radio.Option value={ROLE_LABELS.member}>{ROLE_LABELS.member}</Radio.Option>
                <Radio.Option value={ROLE_LABELS.admin}>{ROLE_LABELS.admin}</Radio.Option>
              </Radio.Group>
            )}
          />
        </div>

        <Input placeholder={MEMBER_FORM_MESSAGES.PLACEHOLDER.NAME} error={errors.name} {...register("name")} />

        <Input placeholder={MEMBER_FORM_MESSAGES.PLACEHOLDER.EMAIL} error={errors.email} {...register("email")} />

        <div className="mb-24">
          <Controller
            name="teams"
            control={control}
            render={({ field: { value, onChange } }) => <TeamDropdown value={value} onSelect={onChange} />}
          />
        </div>

        <ProfileImageUploader currentImage={getCurrentImage()} onImageChange={handleImageChange} />
      </div>

      <Button variant="Primary" type="submit" className="h-48 w-full" isPending={isPending}>
        {getButtonText()}
      </Button>
    </form>
  );
}

import { type UseFormReturn, Controller } from "react-hook-form";
import { Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import { REGEXP_PATTERNS } from "@repo/constants/regexp";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MultiSelectDropdown";
import {
  ROLE_LABELS,
  type RoleOption,
  type FormImageType,
  type MemberWithFileImage,
  type SidePanelFormData,
  type ImageFileType,
} from "@repo/types/src/membersType";
import { useTeams } from "@/app/admin/teams/_hooks/useTeams";
import ProfileImageUploader from "./ProfileImageUploader";

export interface MemberFormProps {
  form: UseFormReturn<SidePanelFormData>;
  isPending: boolean;
  selectedMember: MemberWithFileImage | null;
  onSubmit: (data: SidePanelFormData) => void;
}

export default function MemberForm({ form, isPending, selectedMember, onSubmit }: MemberFormProps): JSX.Element {
  const { data: teams } = useTeams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
  } = form;

  const handleImageChange = (file: ImageFileType): void => {
    setValue("profileImage", file);
  };

  const getButtonText = (): string => {
    if (isPending) return MEMBER_FORM_MESSAGES.BUTTON.SUBMIT.PROCESSING;

    return selectedMember ? MEMBER_FORM_MESSAGES.BUTTON.SUBMIT.UPDATE : MEMBER_FORM_MESSAGES.BUTTON.SUBMIT.ADD;
  };

  const getRoleValue = (displayText: string): RoleOption => {
    const entry = Object.entries(ROLE_LABELS).find(([_, value]) => value === displayText);

    return entry?.[0] as RoleOption;
  };

  const getRoleDisplay = (value: RoleOption): string => {
    return ROLE_LABELS[value];
  };

  const getCurrentImage = (): FormImageType => {
    const profileImage = watch("profileImage");

    return profileImage;
  };

  return (
    <form onSubmit={(...args) => void handleSubmit(onSubmit)(...args)}>
      <div className="w-154 mb-24">
        <Controller
          name="role"
          control={control}
          rules={{ required: MEMBER_FORM_MESSAGES.VALIDATION.ROLE.REQUIRED }}
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

      <Input
        placeholder={MEMBER_FORM_MESSAGES.PLACEHOLDER.NAME}
        error={errors.name}
        {...register("name", {
          required: MEMBER_FORM_MESSAGES.VALIDATION.NAME.REQUIRED,
          minLength: {
            value: 2,
            message: MEMBER_FORM_MESSAGES.VALIDATION.NAME.MIN_LENGTH,
          },
        })}
      />

      <Input
        placeholder={MEMBER_FORM_MESSAGES.PLACEHOLDER.EMAIL}
        error={errors.email}
        {...register("email", {
          required: MEMBER_FORM_MESSAGES.VALIDATION.EMAIL.REQUIRED,
          pattern: {
            value: REGEXP_PATTERNS.EMAIL,
            message: MEMBER_FORM_MESSAGES.VALIDATION.EMAIL.PATTERN,
          },
        })}
      />

      <div className="mb-24">
        <Controller
          name="teams"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MultiSelectDropdown selectedValue={value} onSelect={onChange}>
              <MultiSelectDropdown.Toggle>
                {value.length > 0 ? value.join(", ") : MEMBER_FORM_MESSAGES.PLACEHOLDER.TEAM}
              </MultiSelectDropdown.Toggle>
              <MultiSelectDropdown.Wrapper>
                {teams.map(({ name }) => (
                  <MultiSelectDropdown.Item key={name} value={name}>
                    {name}
                  </MultiSelectDropdown.Item>
                ))}
              </MultiSelectDropdown.Wrapper>
            </MultiSelectDropdown>
          )}
        />
      </div>

      <ProfileImageUploader currentImage={getCurrentImage()} onImageChange={handleImageChange} />

      <Button variant="Primary" type="submit" className="h-48 w-full" disabled={isPending}>
        {getButtonText()}
      </Button>
    </form>
  );
}

import { useRef, useEffect } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import { DoubleChevron } from "@ui/public";
import { REGEXP_PATTERNS } from "@repo/constants/regexp";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { TEAMS } from "@repo/constants/teams";
import {
  type MemberWithFileImage,
  type SidePanelFormData,
  ROLE_LABELS,
  type RoleOption,
  type ImageFileType,
  type FormImageType,
} from "@repo/types/src/membersType";
import { useMembersMutations } from "../_hooks/useMembersMutations";
import ProfileImageUploader from "./ProfileImageUploader";

interface AddMemberSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: MemberWithFileImage | null;
}

export const initialFormData: SidePanelFormData = {
  role: "member",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export default function SidePanel({ isOpen, onClose, selectedMember }: AddMemberSidePanelProps): JSX.Element {
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const { handleSubmitMutation, removeMember, isPending } = useMembersMutations({
    onSuccess: onClose,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch,
    reset,
  } = useForm<SidePanelFormData>({
    defaultValues: initialFormData,
  });

  const onSubmit: SubmitHandler<SidePanelFormData> = (data: SidePanelFormData): void => {
    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("name", data.name);
    formData.append("email", data.email);
    data.teams.forEach((team) => {
      formData.append("teams", team);
    });

    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }

    handleSubmitMutation({ formData, selectedMember });
  };

  const handleWithdraw = (): void => {
    if (!selectedMember) return;

    removeMember(selectedMember._id);
  };

  const getButtonText = (): string => {
    if (isPending) {
      return MEMBER_FORM_MESSAGES.BUTTON.SUBMIT.PROCESSING;
    }

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

  const handleImageChange = (file: ImageFileType): void => {
    setValue("profileImage", file);
  };

  useOnClickOutside(sidePanelRef, () => {
    if (isOpen) {
      onClose();
    }
  });

  // 멤버 수정 시, 폼 데이터 초기화 및 사이드 패널 상태 관리
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        reset(initialFormData);
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    } else if (selectedMember) {
      reset({
        role: selectedMember.role,
        name: selectedMember.name,
        email: selectedMember.email,
        teams: selectedMember.teams,
        profileImage: selectedMember.profileImage ?? null,
      });
    }
  }, [isOpen, selectedMember, reset]);

  return (
    <div
      ref={sidePanelRef}
      className={`md:w-414 border-custom-black fixed right-0 top-0 z-10 h-full w-full transform border-l bg-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} type="button" className="mb-32 ml-16 mt-16 flex flex-row">
        <DoubleChevron />
      </button>
      <div className="mx-32 mb-40">
        <div className={selectedMember ? "flex justify-between" : ""}>
          <h1 className="text-3xl-bold mb-32">
            {selectedMember ? MEMBER_FORM_MESSAGES.TITLE.UPDATE : MEMBER_FORM_MESSAGES.TITLE.ADD}
          </h1>
          {selectedMember ? (
            <button
              type="button"
              onClick={handleWithdraw}
              className="text-sm-medium text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black w-71 rounded-6 border-custom-black/20 h-32 border transition-all duration-300"
            >
              {MEMBER_FORM_MESSAGES.BUTTON.WITHDRAW}
            </button>
          ) : null}
        </div>

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
                    {TEAMS.map((team) => (
                      <MultiSelectDropdown.Item key={team} value={team}>
                        {team}
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
      </div>
    </div>
  );
}

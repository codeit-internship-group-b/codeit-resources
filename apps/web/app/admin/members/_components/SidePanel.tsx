"use client";

import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { notify, Modal, Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import { DoubleChevron } from "@ui/public";
import { BLUR_DATA_URL, IMAGE_TYPES, MAX_SIZE } from "@repo/ui/src/utils/constants/image";
import { TOAST_MESSAGES, MEMBER_FORM_MESSAGES, MODAL_MESSAGES } from "@repo/ui/src/utils/constants/notificationMessage";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { REGEXP_PATTERNS } from "@repo/ui/src/utils/constants/regexp";
import { MOCK_TEAMS } from "../mockData";
import { type MemberWithFileImage, type SidePanelFormData, ROLE_LABELS, type RoleOption } from "../types";
import { useMemberMutations } from "../_hooks/useMemberMutation";

interface AddMemberSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: MemberWithFileImage | null;
}

const initialFormData: SidePanelFormData = {
  role: "member",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export default function SidePanel({ isOpen, onClose, selectedMember }: AddMemberSidePanelProps): JSX.Element {
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");
  const [isImageError, setIsImageError] = useState(false);
  const sidePanelRef = useRef<HTMLDivElement>(null);

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

  const { handleSubmitMutation, removeMember, isPending } = useMemberMutations({
    onSuccess: onClose,
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      notify({
        type: "error",
        message: TOAST_MESSAGES.INVALID_IMAGE_TYPE,
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      notify({
        type: "error",
        message: TOAST_MESSAGES.INVAILD_IMAGE_SIZE,
      });
      e.target.value = "";
      return;
    }

    const newObjectUrl = URL.createObjectURL(file);
    setImageObjectUrl(newObjectUrl);
    setValue("profileImage", file);
  };

  const onSubmit = (data: SidePanelFormData): void => {
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

  const handleModalConfirm = (): void => {
    if (!selectedMember) return;

    removeMember(selectedMember._id);
  };

  const handleImageError = (): void => {
    setIsImageError(true);
  };

  const getImageSource = (): string | StaticImport => {
    if (isImageError) {
      return DefaultProfileImage;
    }

    const profileImage = watch("profileImage");

    if (profileImage instanceof File) {
      return imageObjectUrl;
    }

    if (typeof profileImage === "string" && profileImage) {
      return profileImage;
    }

    return DefaultProfileImage;
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
        setImageObjectUrl("");
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

  // 컴포넌트 언마운트 시에만 URL 해제
  useEffect(() => {
    return () => {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl);
      }
    };
  }, [imageObjectUrl]);

  return (
    <Modal.Root>
      <div
        ref={sidePanelRef}
        className={`w-414 fixed right-0 top-0 z-10 h-full transform border-l border-[#33323633] bg-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out ${
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
              <Modal.Trigger>
                <button
                  type="button"
                  className="text-sm-medium text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black w-71 rounded-6 border-custom-black/20 h-32 border transition-all duration-300"
                >
                  {MEMBER_FORM_MESSAGES.BUTTON.WITHDRAW}
                </button>
              </Modal.Trigger>
            ) : null}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
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
                      {MOCK_TEAMS.map((team) => (
                        <MultiSelectDropdown.Item key={team} value={team}>
                          {team}
                        </MultiSelectDropdown.Item>
                      ))}
                    </MultiSelectDropdown.Wrapper>
                  </MultiSelectDropdown>
                )}
              />
            </div>

            <div className="mb-[262px] flex items-center gap-24">
              <Image
                src={getImageSource()}
                alt={
                  watch("profileImage")
                    ? MEMBER_FORM_MESSAGES.IMAGE.PREVIEW_ALT
                    : MEMBER_FORM_MESSAGES.IMAGE.DEFAULT_ALT
                }
                width={120}
                height={120}
                placeholder="blur"
                blurDataURL={BLUR_DATA_URL}
                onError={handleImageError}
                className="size-120 rounded-full object-cover"
              />
              <label
                htmlFor="profileImage"
                className="w-86 border-custom-black/20 rounded-6 text-sm-medium text-custom-black/80 flex h-32 cursor-pointer items-center justify-center border transition-colors duration-300 hover:border-purple-400 hover:text-purple-400"
              >
                {MEMBER_FORM_MESSAGES.BUTTON.UPLOAD_PHOTO}
                <input
                  id="profileImage"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <Button variant="Primary" type="submit" className="w-full" disabled={isPending}>
              {getButtonText()}
            </Button>
          </form>
        </div>
      </div>

      <Modal.Content>
        <Modal.Title>{MODAL_MESSAGES.WITHDRAW.TITLE(selectedMember?.name)}</Modal.Title>
        <Modal.Description>{MODAL_MESSAGES.WITHDRAW.DESCRIPTION}</Modal.Description>
        <Modal.Close
          onConfirm={handleModalConfirm}
          confirmText={MODAL_MESSAGES.WITHDRAW.CONFIRM}
          cancelText={MODAL_MESSAGES.WITHDRAW.CANCEL}
        />
      </Modal.Content>
    </Modal.Root>
  );
}

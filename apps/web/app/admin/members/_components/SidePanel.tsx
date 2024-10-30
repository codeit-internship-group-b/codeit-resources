/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, useRef, type ChangeEvent } from "react";
import { useForm, Controller } from "react-hook-form";
import Image from "next/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { notify, Modal, Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import { DoubleChevron } from "@ui/public";
import { IMAGE_TYPES, MAX_SIZE } from "@repo/ui/src/utils/constants/image";
import { NOTIFICATION_MESSAGES } from "@repo/ui/src/utils/constants/notificationMessage";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import { patchMember, postMember, deleteMember } from "@/api/members";
import { MOCK_TEAMS } from "../mockData";
import { type MemberWithFileImage, type SidePanelFormData } from "../types";

const roleOptions = {
  member: "멤버",
  admin: "어드민",
} as const;

type RoleOption = keyof typeof roleOptions;

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
  const queryClient = useQueryClient();
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

  const postMemberMutation = useMutation({
    mutationFn: postMember,
    onSuccess: async () => {
      notify({
        type: "success",
        message: selectedMember ? NOTIFICATION_MESSAGES.MEMBER_UPDATE : NOTIFICATION_MESSAGES.MEMBER_ADD,
      });
      await queryClient.invalidateQueries({ queryKey: ["members"] });
      onClose();
    },
  });

  const patchMemberMutation = useMutation({
    mutationFn: (data: FormData) => (selectedMember ? patchMember(selectedMember._id, data) : postMember(data)),
    onSuccess: async () => {
      notify({
        type: "success",
        message: selectedMember ? NOTIFICATION_MESSAGES.MEMBER_UPDATE : NOTIFICATION_MESSAGES.MEMBER_ADD,
      });
      await queryClient.invalidateQueries({ queryKey: ["members"] });
      onClose();
    },
  });

  const deleteMemberMutation = useMutation({
    mutationFn: (userId: string) => deleteMember(userId),
    onSuccess: async () => {
      notify({
        type: "success",
        message: NOTIFICATION_MESSAGES.MEMBER_DELETE,
      });
      await queryClient.invalidateQueries({ queryKey: ["members"] });
      onClose();
    },
  });

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      notify({
        type: "error",
        message: NOTIFICATION_MESSAGES.INVALID_IMAGE_TYPE,
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      notify({
        type: "error",
        message: NOTIFICATION_MESSAGES.INVAILD_IMAGE_SIZE,
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

    if (selectedMember) {
      patchMemberMutation.mutate(formData);
    } else {
      postMemberMutation.mutate(formData);
    }
  };

  const handleModalConfirm = (): void => {
    if (!selectedMember) return;

    deleteMemberMutation.mutate(selectedMember._id);
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
    const isPending = selectedMember ? patchMemberMutation.isPending : postMemberMutation.isPending;

    if (isPending) {
      return "처리 중...";
    }

    return selectedMember ? "수정하기" : "추가하기";
  };

  const getRoleValue = (displayText: string): RoleOption => {
    const entry = Object.entries(roleOptions).find(([_, value]) => value === displayText);
    return entry?.[0] as RoleOption;
  };

  const getRoleDisplay = (value: RoleOption): string => {
    return roleOptions[value];
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
            <h1 className="text-3xl-bold mb-32">{selectedMember ? "멤버 수정" : "멤버 추가"}</h1>
            {selectedMember ? (
              <Modal.Trigger>
                <button
                  type="button"
                  className="text-sm-medium text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black w-71 rounded-6 border-custom-black/20 h-32 border transition-all duration-300"
                >
                  탈퇴하기
                </button>
              </Modal.Trigger>
            ) : null}
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="w-154 mb-24">
              <Controller
                name="role"
                control={control}
                rules={{ required: "역할을 선택해주세요" }}
                render={({ field: { value, onChange } }) => (
                  <Radio.Group
                    value={getRoleDisplay(value)}
                    onChange={(displayText) => {
                      onChange(getRoleValue(displayText));
                    }}
                  >
                    <Radio.Option value={roleOptions.member}>{roleOptions.member}</Radio.Option>
                    <Radio.Option value={roleOptions.admin}>{roleOptions.admin}</Radio.Option>
                  </Radio.Group>
                )}
              />
            </div>

            <Input
              id="name"
              type="text"
              value={selectedMember ? selectedMember.name : " "}
              placeholder="멤버 이름"
              isError={Boolean(errors.name)}
              errorMessage={errors.name?.message}
              {...register("name", {
                required: "이름을 입력해주세요",
                minLength: {
                  value: 2,
                  message: "이름은 2자 이상이어야 합니다",
                },
              })}
            />

            <Input
              id="email"
              type="email"
              value={selectedMember ? selectedMember.email : " "}
              placeholder="멤버 이메일"
              isError={Boolean(errors.email)}
              errorMessage={errors.email?.message}
              {...register("email", {
                required: "이메일을 입력해주세요",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "올바른 이메일 형식이 아닙니다",
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
                      {value.length > 0 ? value.join(", ") : "팀"}
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
                alt={watch("profileImage") ? "프로필 이미지 미리보기" : "기본 프로필 이미지"}
                width={120}
                height={120}
                className="size-120 rounded-full object-cover"
                onError={handleImageError}
              />
              <label
                htmlFor="profileImage"
                className="w-86 border-custom-black/20 rounded-6 text-sm-medium text-custom-black/80 flex h-32 cursor-pointer items-center justify-center border transition-colors duration-300 hover:border-purple-400 hover:text-purple-400"
              >
                사진 업로드
                <input
                  id="profileImage"
                  type="file"
                  accept=".png, .jpeg, .jpg"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </label>
            </div>

            <Button variant="Primary" type="submit" className="w-full" disabled={postMemberMutation.isPending}>
              {getButtonText()}
            </Button>
          </form>
        </div>
      </div>

      <Modal.Content>
        <Modal.Title>'{selectedMember?.name}'님을 탈퇴시킬까요?</Modal.Title>
        <Modal.Description>
          탈퇴 시, 해당 멤버는 더 이상 목록에서 보이지 않으며, 해당 계정으로 로그인이 불가합니다.
        </Modal.Description>
        <Modal.Close onConfirm={handleModalConfirm} confirmText="탈퇴하기" cancelText="취소하기" />
      </Modal.Content>
    </Modal.Root>
  );
}

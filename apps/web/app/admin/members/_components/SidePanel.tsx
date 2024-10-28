/* eslint-disable react/no-unescaped-entities */
"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import Image from "next/image";
import { notify, Modal, Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import Button from "@ui/src/components/common/Button";
import { DoubleChevron } from "@ui/public";
import { IMAGE_TYPES, MAX_SIZE } from "@repo/ui/src/utils/constants/image";
import { NOTIFICATION_MESSAGES } from "@repo/ui/src/utils/constants/notificationMessage";
import { MEMBER_ROLES } from "@ui/src/utils/constants/memberRoles";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MulitiSelectDropdown";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { type IUser } from "@repo/types";
import { MOCK_TEAMS } from "../mockData";
import { type MemberWithFileImage, type SidePanelFormData } from "../types";

interface AddMemberSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: MemberWithFileImage | null;
}

const initialFormData: SidePanelFormData = {
  role: "멤버",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export default function SidePanel({ isOpen, onClose, selectedMember }: AddMemberSidePanelProps): JSX.Element {
  const [formData, setFormData] = useState<SidePanelFormData>(initialFormData);
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");
  const [isImageError, setIsImageError] = useState(false);

  const handleRoleChange = (role: string): void => {
    setFormData((prev) => ({ ...prev, role: role as IUser["role"] }));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTeamsSelect = (teams: string[]): void => {
    setFormData((prev) => ({ ...prev, teams }));
  };

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
    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  // TODO: 폼 제출 로직
  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    notify({
      type: "success",
      message: selectedMember ? NOTIFICATION_MESSAGES.MEMBER_UPDATE : NOTIFICATION_MESSAGES.MEMBER_ADD,
    });
    onClose();
  };

  const handleModalConfirm = (): void => {
    notify({
      type: "success",
      message: NOTIFICATION_MESSAGES.MEMBER_DELETE,
    });
  };

  const handleImageError = (): void => {
    setIsImageError(true);
  };

  const getImageSource = (): string | StaticImport => {
    if (isImageError) {
      return DefaultProfileImage;
    }

    if (formData.profileImage instanceof File) {
      return imageObjectUrl;
    }

    if (typeof formData.profileImage === "string" && formData.profileImage) {
      return formData.profileImage;
    }

    return DefaultProfileImage;
  };

  // 멤버 수정 시, 폼 데이터 초기화 및 사이드 패널 상태 관리
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData(initialFormData);
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    } else if (selectedMember) {
      setFormData({
        role: selectedMember.role,
        name: selectedMember.name,
        email: selectedMember.email,
        teams: selectedMember.teams,
        profileImage: selectedMember.profileImage ?? null,
      });
    }
  }, [isOpen, selectedMember]);

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

          <form onSubmit={handleSubmit}>
            <div className="w-154 mb-24">
              <Radio.Group value={formData.role} onChange={handleRoleChange}>
                <Radio.Option value="멤버">{MEMBER_ROLES.MEMBER}</Radio.Option>
                <Radio.Option value="어드민">{MEMBER_ROLES.ADMIN}</Radio.Option>
              </Radio.Group>
            </div>
            <Input id="name" type="text" value={formData.name} placeholder="멤버 이름" onChange={handleInputChange} />
            <Input
              id="email"
              type="email"
              value={formData.email}
              placeholder="멤버 이메일"
              onChange={handleInputChange}
            />
            <div className="mb-24">
              <MultiSelectDropdown selectedValue={formData.teams} onSelect={handleTeamsSelect}>
                <MultiSelectDropdown.Toggle>
                  {formData.teams.length > 0 ? formData.teams.join(", ") : "팀"}
                </MultiSelectDropdown.Toggle>
                <MultiSelectDropdown.Wrapper>
                  {MOCK_TEAMS.map((team) => (
                    <MultiSelectDropdown.Item key={team} value={team}>
                      {team}
                    </MultiSelectDropdown.Item>
                  ))}
                </MultiSelectDropdown.Wrapper>
              </MultiSelectDropdown>
            </div>
            <div className="mb-[262px] flex items-center gap-24">
              <Image
                src={getImageSource()}
                alt={formData.profileImage ? "프로필 이미지 미리보기" : "기본 프로필 이미지"}
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
            <Button variant="Primary" type="submit" className="w-full">
              {selectedMember ? "수정하기" : "추가하기"}
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

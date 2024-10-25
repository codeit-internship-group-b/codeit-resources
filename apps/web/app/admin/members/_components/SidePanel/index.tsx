/* eslint-disable @typescript-eslint/no-confusing-void-expression */
/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-console */
"use client";

import { useState, useEffect } from "react";
import { notify, Modal } from "@ui/index";
import { DoubleChevron } from "@ui/public";
import { IMAGE_TYPES } from "@repo/ui/src/utils/constants/imageTypes";
import { NOTIFICATION_MESSAGES } from "@repo/ui/src/utils/constants/notificationMessage";
import MemberForm from "./MemberForm";
import { type AddMemberSidePanelProps, type MemberFormData } from "./index.types";

const initialFormData: MemberFormData = {
  role: "멤버",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export default function SidePanel({ isOpen, onClose, selectedMember }: AddMemberSidePanelProps): JSX.Element {
  const [formData, setFormData] = useState<MemberFormData>(initialFormData);

  const handleRoleChange = (role: string): void => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleTeamsSelect = (teams: string[]): void => {
    setFormData((prev) => ({ ...prev, teams }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>): void => {
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

    setFormData((prev) => ({ ...prev, profileImage: file }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    // TODO: 폼 제출 로직
    console.log("폼 제출:", formData);

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

  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        setFormData(initialFormData);
      }, 100);

      return () => clearTimeout(timer);
    } else if (selectedMember) {
      setFormData({
        role: selectedMember.role,
        name: selectedMember.name,
        email: selectedMember.email,
        teams: selectedMember.teams,
        profileImage: selectedMember.profileImage,
      });
    }
  }, [isOpen, selectedMember]);

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

          <MemberForm
            formData={formData}
            onRoleChange={handleRoleChange}
            onInputChange={handleInputChange}
            onTeamsSelect={handleTeamsSelect}
            onImageUpload={handleImageUpload}
            onSubmit={handleSubmit}
            isEdit={Boolean(selectedMember)}
          />
        </div>
      </div>

      {/* 모달 */}
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

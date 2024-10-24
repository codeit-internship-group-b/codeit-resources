/* eslint-disable no-console */
"use client";

import { useState } from "react";
import Image from "next/image";
import Button from "@ui/src/components/common/Button";
import { notify, Radio } from "@ui/index";
import { DoubleChevron } from "@ui/public";
import Input from "@ui/src/components/common/Input";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MulitiSelectDropdown";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";

interface AddMemberSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MemberFormData {
  role: string;
  name: string;
  email: string;
  teams: string[];
  profileImage: File | null;
}

const TEAMS = ["Management", "Finance", "Strategy", "Brand Experience", "People & Culture"];
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export default function SidePanel({ isOpen, onClose }: AddMemberSidePanelProps): JSX.Element {
  const [formData, setFormData] = useState<MemberFormData>({
    role: "멤버",
    name: "",
    email: "",
    teams: [],
    profileImage: null,
  });

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

    if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
      notify({
        type: "error",
        message: "PNG, JPEG 또는 JPG 파일만 업로드 가능합니다.",
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
  };

  return (
    <div
      className={`w-414 fixed right-0 top-0 z-10 h-full transform border-l border-[#33323633] bg-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <button onClick={onClose} type="button" className="mb-32 ml-16 mt-16 flex flex-row">
        <DoubleChevron />
      </button>
      <div className="mx-32 mb-40">
        <h1 className="text-3xl-bold mb-32">멤버 추가</h1>

        <form onSubmit={handleSubmit}>
          {/* 라디오 버튼 */}
          <div className="mb-24">
            <Radio.Group defaultValue={formData.role} onChange={handleRoleChange}>
              <Radio.Option value="멤버">멤버</Radio.Option>
              <Radio.Option value="어드민">어드민</Radio.Option>
            </Radio.Group>
          </div>

          {/* 멤버 이름 */}
          <Input id="name" type="text" value={formData.name} placeholder="멤버 이름" onChange={handleInputChange} />

          {/* 멤버 이메일 */}
          <Input
            id="email"
            type="email"
            value={formData.email}
            placeholder="멤버 이메일"
            onChange={handleInputChange}
          />

          {/* 팀 선택 */}
          <div className="mb-24">
            <MultiSelectDropdown selectedValue={formData.teams} onSelect={handleTeamsSelect}>
              <MultiSelectDropdown.Toggle>
                {formData.teams.length > 0 ? formData.teams.join(", ") : "팀"}
              </MultiSelectDropdown.Toggle>
              <MultiSelectDropdown.Wrapper>
                {TEAMS.map((team) => (
                  <MultiSelectDropdown.Item key={team} value={team}>
                    {team}
                  </MultiSelectDropdown.Item>
                ))}
              </MultiSelectDropdown.Wrapper>
            </MultiSelectDropdown>
          </div>

          {/* 이미지 선택 */}
          <div className="mb-[262px] flex items-center gap-24">
            {formData.profileImage ? (
              <Image
                src={URL.createObjectURL(formData.profileImage)}
                alt="프로필 이미지 미리보기"
                width={120}
                height={120}
                className="size-120 rounded-full object-cover"
              />
            ) : (
              <Image src={DefaultProfileImage} alt="기본 프로필 이미지" width={120} height={120} />
            )}
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

          {/* 폼 제출 버튼 */}
          <Button variant="Primary" type="submit" className="w-full">
            추가하기
          </Button>
        </form>
      </div>
    </div>
  );
}

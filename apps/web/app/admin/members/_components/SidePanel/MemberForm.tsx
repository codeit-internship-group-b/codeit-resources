import Image from "next/image";
import { Radio } from "@ui/index";
import Input from "@ui/src/components/common/Input";
import MultiSelectDropdown from "@repo/ui/src/components/common/Dropdown/MulitiSelectDropdown";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import Button from "@ui/src/components/common/Button";
import { MOCK_TEAMS } from "../../mockData";
import { type MemberFormProps } from "./MemberForm.types";

export default function MemberForm({
  formData,
  onRoleChange,
  onInputChange,
  onTeamsSelect,
  onImageUpload,
  onSubmit,
  isEdit = false,
}: MemberFormProps): JSX.Element {
  return (
    <form onSubmit={onSubmit}>
      <div className="mb-24">
        <Radio.Group value={formData.role} onChange={onRoleChange}>
          <Radio.Option value="멤버">멤버</Radio.Option>
          <Radio.Option value="어드민">어드민</Radio.Option>
        </Radio.Group>
      </div>

      <Input id="name" type="text" value={formData.name} placeholder="멤버 이름" onChange={onInputChange} />
      <Input id="email" type="email" value={formData.email} placeholder="멤버 이메일" onChange={onInputChange} />

      <div className="mb-24">
        <MultiSelectDropdown selectedValue={formData.teams} onSelect={onTeamsSelect}>
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
        {formData.profileImage ? (
          <Image
            src={
              formData.profileImage instanceof File ? URL.createObjectURL(formData.profileImage) : formData.profileImage
            }
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
          <input id="profileImage" type="file" accept=".png, .jpeg, .jpg" className="hidden" onChange={onImageUpload} />
        </label>
      </div>

      <Button variant="Primary" type="submit" className="w-full">
        {isEdit ? "수정하기" : "추가하기"}
      </Button>
    </form>
  );
}

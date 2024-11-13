import { useState, type MouseEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { Badge } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import { Chevron } from "@ui/public";
import { type MemberWithStaticImage, ROLE_LABELS, type RoleOption } from "@repo/types/src/membersType";
import { BLUR_DATA_URL } from "@repo/constants/image";
import { useMembersMutations } from "../_hooks/useMembersMutations";

interface MemberListItemProps {
  member: MemberWithStaticImage;
  onMemberClick: (member: MemberWithStaticImage) => void;
}

export default function MemberListItem({ member, onMemberClick }: MemberListItemProps): JSX.Element {
  const [currentRole, setCurrentRole] = useState<RoleOption>(member.role);
  const [isImageError, setIsImageError] = useState(false);

  const { updateMember } = useMembersMutations();

  const imageSource = isImageError ? DefaultProfileImage : (member.profileImage ?? DefaultProfileImage);

  const getRoleValue = (displayText: string): RoleOption => {
    const entry = Object.entries(ROLE_LABELS).find(([_, value]) => value === displayText);

    return entry?.[0] as RoleOption;
  };

  const getRoleDisplay = (value: RoleOption): string => {
    return ROLE_LABELS[value];
  };

  const handleMemberClick = (e: MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLElement;

    if (!target.closest('[data-dropdown="true"]')) {
      onMemberClick(member);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Escape") {
      e.currentTarget.blur();

      return;
    }

    if (e.key === "Enter" || e.key === " ") {
      onMemberClick(member);
    }
  };

  const handleRoleChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      const newRole = getRoleValue(value);
      setCurrentRole(newRole);

      if (newRole === currentRole) return;

      const formData = new FormData();
      formData.append("role", newRole);

      updateMember({
        id: member._id,
        data: formData,
      });
    }
  };

  const handleImageError = (): void => {
    setIsImageError(true);
  };

  return (
    <div
      // 하위에 버튼 요소가 포함되어 있어 div에 role="button"을 사용함
      role="button"
      tabIndex={0}
      onClick={handleMemberClick}
      onKeyDown={handleKeyDown}
      className="rounded-12 relative flex cursor-pointer items-center border border-gray-200/10 px-16 py-12 outline outline-1 outline-transparent transition-all duration-300 hover:border-transparent hover:bg-purple-700/5 hover:outline-purple-300 md:px-24 md:py-16"
    >
      <div className="flex items-center gap-8 md:gap-16">
        <Image
          src={imageSource}
          alt={`${member.name}의 프로필`}
          width={40}
          height={40}
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          onError={handleImageError}
          className="size-40 rounded-full"
        />
        <span className="text-custom-black text-md-regular md:text-lg-regular">{member.name}</span>
        <span className="text-custom-black/60 max-w-200 overflow-wrap-break-word text-md-regular md:text-lg-regular mr-16 break-all">
          {member.email}
        </span>
      </div>

      <div data-dropdown="true" className="hidden md:absolute md:left-[356px] md:block">
        <Dropdown selectedValue={getRoleDisplay(currentRole)} onSelect={handleRoleChange} size="sm">
          <Dropdown.Toggle>{getRoleDisplay(currentRole)}</Dropdown.Toggle>
          <Dropdown.Wrapper className="top-42">
            {Object.entries(ROLE_LABELS).map(([value, label]) => (
              <Dropdown.Item hoverStyle="purple" key={value} value={label}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Wrapper>
        </Dropdown>
      </div>

      <div className="hidden md:absolute md:left-[484px] md:flex md:flex-grow md:flex-wrap md:gap-16">
        {member.teams.map((team) => (
          <Badge key={team} color="purple" colorApplyTo="font" shape="round">
            {team}
          </Badge>
        ))}
      </div>

      <Chevron className="top-22 md:top-26 absolute right-16 rotate-180 md:right-24" />
    </div>
  );
}

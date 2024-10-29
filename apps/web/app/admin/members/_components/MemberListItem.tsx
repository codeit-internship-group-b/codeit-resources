import { useState, type MouseEvent, type KeyboardEvent } from "react";
import Image from "next/image";
import { Badge } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import { type MemberWithStaticImage } from "../types";

const roleOptions = {
  member: "멤버",
  admin: "어드민",
} as const;

type RoleOption = keyof typeof roleOptions;

interface MemberListItemProps {
  member: MemberWithStaticImage;
  onMemberClick: (member: MemberWithStaticImage) => void;
}

export default function MemberListItem({ member, onMemberClick }: MemberListItemProps): JSX.Element {
  const [currentRole, setCurrentRole] = useState<RoleOption>(member.role);
  const [isImageError, setIsImageError] = useState(false);

  const getRoleValue = (displayText: string): RoleOption => {
    const entry = Object.entries(roleOptions).find(([_, value]) => value === displayText);
    return entry?.[0] as RoleOption;
  };

  const getRoleDisplay = (value: RoleOption): string => {
    return roleOptions[value];
  };

  const imageSource = isImageError ? DefaultProfileImage : (member.profileImage ?? DefaultProfileImage);

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
      setCurrentRole(getRoleValue(value));
    }
  };

  const handleImageError = (): void => {
    setIsImageError(true);
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={handleMemberClick}
      onKeyDown={handleKeyDown}
      className="rounded-12 flex cursor-pointer items-center border border-gray-200/10 px-24 py-16 outline outline-1 outline-transparent transition-all duration-300 hover:border-transparent hover:bg-purple-700/5 hover:outline-purple-300"
    >
      <div className="flex items-center gap-16">
        <Image
          src={imageSource}
          alt={`${member.name}의 프로필`}
          width={40}
          height={40}
          className="size-40 rounded-full"
          onError={handleImageError}
        />
        <span className="text-custom-black">{member.name}</span>
        <span className="text-custom-black/60 max-w-200 overflow-wrap-break-word mr-16 break-all">{member.email}</span>
      </div>
      <div className="mr-16 flex flex-grow flex-wrap gap-16">
        {member.teams.map((team) => (
          <Badge key={team} color="purple" colorApplyTo="font" shape="round">
            {team}
          </Badge>
        ))}
      </div>
      <div data-dropdown="true">
        <Dropdown selectedValue={getRoleDisplay(currentRole)} onSelect={handleRoleChange} size="sm">
          <Dropdown.Toggle>{getRoleDisplay(currentRole)}</Dropdown.Toggle>
          <Dropdown.Wrapper className="top-42">
            {Object.entries(roleOptions).map(([value, label]) => (
              <Dropdown.Item hoverStyle="purple" key={value} value={label}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
    </div>
  );
}

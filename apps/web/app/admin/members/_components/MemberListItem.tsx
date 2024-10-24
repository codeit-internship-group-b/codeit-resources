import { useState } from "react";
import Image from "next/image";
import { Badge } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { type Member } from "../mockData";

interface MemberListItemProps {
  member: Member;
  onMemberClick: (member: Member) => void;
}

const MEMBER_ROLES = ["멤버", "어드민"];

export default function MemberListItem({ member, onMemberClick }: MemberListItemProps): JSX.Element {
  const [currentRole, setCurrentRole] = useState(member.role);

  const handleMemberClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    const target = e.target as HTMLElement;
    if (!target.closest('[data-dropdown="true"]')) {
      onMemberClick(member);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
    if (e.key === "Enter" || e.key === " ") {
      onMemberClick(member);
    }
  };

  const handleRoleChange = (value: string | boolean): void => {
    if (typeof value === "string") {
      setCurrentRole(value);
    }
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
          src={member.profileImage}
          alt={`${member.name}의 프로필`}
          width={40}
          height={40}
          className="rounded-full"
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
        <Dropdown selectedValue={currentRole} onSelect={handleRoleChange} size="sm">
          <Dropdown.Toggle>{currentRole}</Dropdown.Toggle>
          <Dropdown.Wrapper className="top-42">
            {MEMBER_ROLES.map((role) => (
              <Dropdown.Item hoverStyle="purple" key={role} value={role}>
                {role}
              </Dropdown.Item>
            ))}
          </Dropdown.Wrapper>
        </Dropdown>
      </div>
    </div>
  );
}

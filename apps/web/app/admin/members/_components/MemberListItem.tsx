/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import Image from "next/image";
import { Badge } from "@ui/index";
import Dropdown from "@ui/src/components/common/Dropdown";
import { type Member } from "../mockData";

interface MemberListItemProps {
  member: Member;
  onMemberClick: (member: Member) => void;
  onRoleChange: (value: string | boolean) => void;
}

const USER_ROLES = ["멤버", "어드민"];

export default function MemberListItem({ member, onMemberClick, onRoleChange }: MemberListItemProps): JSX.Element {
  return (
    <button
      type="button"
      onClick={() => onMemberClick(member)}
      className="rounded-12 flex items-center border border-gray-200/10 px-24 py-16 outline outline-1 outline-transparent transition-all duration-300 hover:border-transparent hover:bg-purple-700/5 hover:outline-purple-300"
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

      <Dropdown selectedValue={member.role} onSelect={onRoleChange} size="sm">
        <Dropdown.Toggle>{member.role}</Dropdown.Toggle>
        <Dropdown.Wrapper className="top-42">
          {USER_ROLES.map((role) => (
            <Dropdown.Item hoverStyle="purple" key={role} value={role}>
              {role}
            </Dropdown.Item>
          ))}
        </Dropdown.Wrapper>
      </Dropdown>
    </button>
  );
}

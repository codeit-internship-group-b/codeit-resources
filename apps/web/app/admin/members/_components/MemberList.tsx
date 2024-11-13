import { type MemberWithStaticImage } from "@repo/types/src/membersType";
import EmptyState from "./EmptyState";
import MemberListItem from "./MemberListItem";

interface MemberListProps {
  members: MemberWithStaticImage[];
  activeTab: string;
  onMemberClick: (member: MemberWithStaticImage) => void;
}

export default function MemberList({ members, activeTab, onMemberClick }: MemberListProps): JSX.Element {
  if (members.length === 0) {
    return <EmptyState activeTab={activeTab} />;
  }

  return (
    <div className="flex flex-col gap-16">
      {members.map((member) => (
        <MemberListItem key={member._id} member={member} onMemberClick={onMemberClick} />
      ))}
    </div>
  );
}

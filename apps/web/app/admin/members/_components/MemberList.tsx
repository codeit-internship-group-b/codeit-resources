import { type MemberWithStaticImage } from "../types";
import SkeletonList from "./SkeletonList";
import EmptyState from "./EmptyState";
import MemberListItem from "./MemberListItem";

interface MemberListProps {
  isLoading: boolean;
  members: MemberWithStaticImage[];
  activeTab: string;
  onMemberClick: (member: MemberWithStaticImage) => void;
}

export default function MemberList({ isLoading, members, activeTab, onMemberClick }: MemberListProps): JSX.Element {
  if (isLoading) {
    return <SkeletonList />;
  }

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

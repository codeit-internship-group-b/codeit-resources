import { useMemo } from "react";
import { type MemberWithStaticImage, type SortOption } from "@repo/types/src/membersType";
import { useMembersSuspenseQuery } from "../_hooks/useMembersSuspenseQuery";
import EmptyState from "./EmptyState";
import MemberListItem from "./MemberListItem";

interface MemberListProps {
  selectedSort: SortOption;
  activeTab: string;
  onMemberClick: (member: MemberWithStaticImage) => void;
}

export default function MemberList({ selectedSort, activeTab, onMemberClick }: MemberListProps): JSX.Element {
  const queryParams = useMemo(() => {
    if (activeTab === "전체") {
      return { selectedSort };
    }
    if (activeTab === "어드민") {
      return { selectedSort, role: "admin" };
    }
    if (activeTab === "멤버") {
      return { selectedSort, role: "member" };
    }

    return { selectedSort, team: activeTab };
  }, [activeTab, selectedSort]);

  const { data: members } = useMembersSuspenseQuery(queryParams);

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

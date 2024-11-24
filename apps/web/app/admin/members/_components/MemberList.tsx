import { useMemo } from "react";
import { type MemberWithStaticImage, type SortOption } from "@repo/types/src/membersType";
import { useIntersectionObserver } from "@repo/ui/src/hooks/useIntersectionObserver";
import LoadingSpinner from "@repo/ui/src/components/common/LoadingSpinner";
import { useMembersSuspenseInfiniteQuery } from "../_hooks/useMembersSuspenseInfiniteQuery";
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

  const {
    data: members,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useMembersSuspenseInfiniteQuery(queryParams);

  const loadMoreRef = useIntersectionObserver({
    onIntersect: () => {
      if (hasNextPage && !isFetchingNextPage) {
        void fetchNextPage();
      }
    },
    threshold: 0.1,
    rootMargin: "500px",
  });

  if (members.length === 0) {
    return <EmptyState activeTab={activeTab} />;
  }

  return (
    <div className="flex flex-col gap-16">
      {members.map((member) => (
        <MemberListItem key={member._id} member={member} onMemberClick={onMemberClick} />
      ))}
      {isFetchingNextPage ? (
        <div className="flex items-center justify-center pb-16">
          <LoadingSpinner width={30} height={30} stroke="#8F00FF" />
        </div>
      ) : (
        <div ref={loadMoreRef} />
      )}
    </div>
  );
}

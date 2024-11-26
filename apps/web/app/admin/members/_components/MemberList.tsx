import { useMemo } from "react";
import { type MemberWithStaticImage, type SortOption } from "@repo/types/src/membersType";
import { SpinnerIcon } from "@ui/public";
import { useIntersectionObserver } from "@repo/ui/src/hooks/useIntersectionObserver";
import { useMembersSuspenseInfiniteQuery } from "../_hooks/useMembersSuspenseInfiniteQuery";
import EmptyState from "./EmptyState";
import MemberListItem from "./MemberListItem";

interface MemberListProps {
  selectedSort: SortOption;
  activeTab: string;
  onMemberClick: (member: MemberWithStaticImage) => void;
  keyword: string;
}

export default function MemberList({ selectedSort, activeTab, onMemberClick, keyword }: MemberListProps): JSX.Element {
  const queryParams = useMemo(() => {
    const baseParams = {
      selectedSort,
      keyword,
    };

    if (activeTab === "전체") {
      return baseParams;
    }
    if (activeTab === "어드민") {
      return { ...baseParams, role: "admin" };
    }
    if (activeTab === "멤버") {
      return { ...baseParams, role: "member" };
    }

    return { ...baseParams, team: activeTab };
  }, [activeTab, selectedSort, keyword]);

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
    return <EmptyState activeTab={activeTab} keyword={keyword} />;
  }

  return (
    <div className="flex flex-col gap-16">
      {keyword ? <p className="text-2lg-bold">&apos;{keyword}&apos; 검색 결과</p> : null}
      {members.map((member) => (
        <MemberListItem key={member._id} member={member} onMemberClick={onMemberClick} />
      ))}
      {isFetchingNextPage ? (
        <div className="flex items-center justify-center pb-16">
          <SpinnerIcon width={30} height={30} color="#8F00FF" className="animate-spin" />
        </div>
      ) : (
        <div ref={loadMoreRef} />
      )}
    </div>
  );
}

import type { SortOption } from "@repo/types/src/membersType";
import { Suspense } from "react";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import { Tab } from "./Tab";
import SortDropdown from "./SortDropdown";
import TabsSkeleton from "./skeleton/TabSkeleton";

interface NavbarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  selectedSort: SortOption;
  onSortChange: (value: SortOption) => void;
}

export default function Navbar({ activeTab, onTabChange, selectedSort, onSortChange }: NavbarProps): JSX.Element {
  const isMobile = useIsMobileStore();

  return (
    <nav className="relative">
      <div className="no-scrollbar w-full overflow-x-auto border-b border-gray-200/10">
        <Suspense fallback={<TabsSkeleton />}>
          <Tab activeTab={activeTab} onTabChange={onTabChange} />
        </Suspense>
        {!isMobile && (
          <div className="w-174 md:bg-custom-gradient absolute right-0 top-0 flex h-full items-center justify-end pb-4">
            <SortDropdown selectedSort={selectedSort} onSortChange={onSortChange} />
          </div>
        )}
      </div>
    </nav>
  );
}

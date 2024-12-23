import cn from "@ui/src/utils/cn";
import { type ReactNode } from "react";

interface SettingsModalContentProps {
  children: ReactNode;
  className?: string;
}

/**
 * `SettingsModal.Content`는 모달 본문에 해당하며, 스크롤 가능한 영역을 제공합니다.
 * @param {SettingsModalContentProps} props - 본문에 표시할 자식 요소를 포함한 객체입니다.
 * @returns {JSX.Element} - 스크롤 가능한 본문 영역 JSX 요소입니다.
 */

export default function SettingsModalContent({ children, className }: SettingsModalContentProps): JSX.Element {
  return <div className={cn("no-scrollbar scrollbar-hidden mb-48 overflow-auto pt-8", `${className}`)}>{children}</div>;
}

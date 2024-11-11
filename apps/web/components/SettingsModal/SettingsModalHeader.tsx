import { Chevron } from "@ui/public";
import { type ReactNode } from "react";
import { useSettingsModal } from "./SettingsModal";

interface SettingsModalHeaderProps {
  title: string;
  actions?: ReactNode;
}

/**
 * `SettingsModal.Header` 컴포넌트는 모달의 헤더 영역을 정의합니다.
 * 제목과 추가 액션을 포함하여 헤더에 표시합니다.
 * @param {SettingsModalHeaderProps} props - 제목과 추가 액션을 포함한 객체입니다.
 * @returns {JSX.Element} - 헤더 영역을 포함한 JSX 요소를 반환합니다.
 */

export default function SettingsModalHeader({ title, actions }: SettingsModalHeaderProps): JSX.Element {
  const { onClose } = useSettingsModal();

  return (
    <div className="relative flex items-center justify-center">
      <Chevron className="absolute left-0 h-40 w-40 p-10" onClick={onClose} />
      <h1 className="text-20">{title}</h1>
      {actions ? <div className="absolute right-0 top-0">{actions}</div> : null}
    </div>
  );
}

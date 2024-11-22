import { Button } from "@ui/index";
import { type ButtonHTMLAttributes, type ReactNode } from "react";

interface SettingsModalButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * `SettingsModal.Button`은 모달 하단에 위치한 주요 액션 버튼입니다.
 * @param {SettingsModalButtonProps} props - 버튼 내부 요소와 추가 속성을 포함한 객체입니다.
 * @returns {JSX.Element} - 모달 하단에 위치한 버튼 JSX 요소입니다.
 */

export default function SettingsModalButton({ children, ...rest }: SettingsModalButtonProps): JSX.Element {
  return (
    <Button className="fixed bottom-32 h-48 w-[calc(100%-32px)] text-base font-medium" variant="Primary" {...rest}>
      {children}
    </Button>
  );
}

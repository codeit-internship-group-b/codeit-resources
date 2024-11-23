import { useLockBodyScroll } from "@ui/src/hooks/useLockBodyScroll";
import { createContext, type ReactNode, useContext } from "react";

/**
 * SettingsModalProps는 SettingsModal 컴포넌트의 props를 정의합니다.
 * @property {boolean} isOpen - 모달의 열림 상태를 나타냅니다.
 * @property {() => void} onClose - 모달을 닫기 위한 콜백 함수입니다.
 * @property {ReactNode} children - 모달 내부에 렌더링할 자식 요소들입니다.
 */
interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

/**
 * SettingsModalContextProps는 모달 컨텍스트의 기본 구조를 정의합니다.
 * @property {() => void} onClose - 모달 닫기 콜백을 제공합니다.
 */
interface SettingsModalContextProps {
  onClose: () => void;
}

/**
 * `useSettingsModal` 훅은 `SettingsModalContext`에 접근하여 `onClose`를 반환합니다.
 * 모달 외부에서 호출할 경우 오류가 발생하지 않도록 기본 반환값을 제공합니다.
 * @returns {SettingsModalContextProps} 모달 닫기 콜백을 포함한 객체를 반환합니다.
 */
const SettingsModalContext = createContext<SettingsModalContextProps | null>(null);

export const useSettingsModal = (): SettingsModalContextProps => {
  const context = useContext(SettingsModalContext);
  // throw Error 대신 빈 객체 반환으로 사용
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  return context ?? { onClose: () => {} };
};

export default function SettingsModal({ isOpen, onClose, children }: SettingsModalProps): JSX.Element | null {
  useLockBodyScroll(isOpen);
  if (!isOpen) return null;

  return (
    <SettingsModalContext.Provider value={{ onClose }}>
      <div className="no-scrollbar scrollbar-hidden fixed left-0 top-0 z-40 flex h-screen w-screen flex-col gap-28 overflow-hidden bg-white px-16 pb-32 pt-36">
        {children}
      </div>
    </SettingsModalContext.Provider>
  );
}

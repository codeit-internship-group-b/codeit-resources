/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CancelIcon, CheckBoldIcon, ProfileDefaultIcon } from "@ui/public";
import { useToastStore } from "@/app/store/useToastStore";

/**
 * 알림 메시지를 표시하는 Toast 컴포넌트.
 *
 * 이 컴포넌트는 `useToastStore`를 사용하여 글로벌 토스트 상태를 확인하고,
 * 현재 `type`, `message`, `isVisible` 상태에 따라 토스트 메시지를 표시합니다.
 *
 * 'success', 'error', 'info'의 세 가지 유형의 토스트를 지원하며, 각 유형에 맞는 스타일과 아이콘이 적용됩니다.
 *
 * `framer-motion`을 사용하여 등장 및 퇴장 애니메이션을 처리하며,
 * `createPortal`을 통해 기존 콘텐츠 위에 토스트를 오버레이 방식으로 렌더링합니다.
 *
 * @example
 * notify("error", getErrorMessage(error));
 *
 * @returns {JSX.Element} 렌더링할 토스트 컴포넌트.
 */

export default function Toast(): JSX.Element {
  const { type, message, isVisible, hideToast } = useToastStore();

  if (!isVisible || !message || !type) return <div />;

  const typeStyles = {
    success: "bg-green-50 border-1 border-gray-200/10",
    error: "bg-error text-white",
    info: "bg-gray-40 text-white",
  };

  const typeIcons = {
    success: <CheckBoldIcon className="h-20 w-20" />,
    error: <CancelIcon className="h-20 w-20" />,
    info: <ProfileDefaultIcon className="h-20 w-20" />,
  };

  return createPortal(
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key={type}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={`text-lg-medium rounded-16 fixed left-[50vw] top-20 z-[999] flex h-44 -translate-x-1/2 items-center gap-10 px-20 py-8 text-white shadow-lg ${
            typeStyles[type]
          }`}
          onClick={() => {
            hideToast();
          }}
        >
          {typeIcons[type]}
          <span>{message}</span>
        </motion.div>
      ) : null}
    </AnimatePresence>,
    document.body,
  );
}

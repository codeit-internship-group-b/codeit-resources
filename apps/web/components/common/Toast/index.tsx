// components/Toast.tsx
import { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useToastStore } from "@/app/store/useToastStore";

export default function Toast(): JSX.Element {
  const { type, message, isVisible, hideToast } = useToastStore();

  if (!isVisible || !message || !type) return <div />;

  // 타입별 스타일
  const typeStyles = {
    success: "bg-green-500 text-white",
    error: "bg-red-500 text-white",
    info: "bg-blue-500 text-white",
  };

  // 타입별 아이콘
  const typeIcons = {
    success: (
      <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 체크 아이콘 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    error: (
      <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 엑스 아이콘 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
      </svg>
    ),
    info: (
      <svg className="mr-2 h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {/* 정보 아이콘 */}
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01" />
      </svg>
    ),
  };

  return createPortal(
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          key={type}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.7 }}
          transition={{ duration: 0.3 }}
          className={`md:-ml-200 fixed left-1/2 top-20 z-50 flex -translate-x-1/2 transform items-center rounded-lg px-4 py-2 shadow-lg ${
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

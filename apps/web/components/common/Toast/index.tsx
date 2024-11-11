/* eslint-disable @typescript-eslint/no-unnecessary-condition */
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CancelIcon, CheckBoldIcon, ProfileDefaultIcon } from "@ui/public";
import { useToastStore } from "@/app/store/useToastStore";

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

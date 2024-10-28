import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import cn from "@ui/src/utils/cn";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  className?: string;
  children: React.ReactNode;
}

export function BaseModal(props: BaseModalProps): JSX.Element {
  const { isOpen, onClose, className, children } = props;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-75"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call
            className={cn(
              "max-w-1200 rounded-16 relative h-auto max-h-full w-auto overflow-auto bg-white",
              // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
              `${className}`,
            )}
            initial={{ scale: 1 }}
            animate={{ scale: 1 }}
            exit={{ scale: 1 }}
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

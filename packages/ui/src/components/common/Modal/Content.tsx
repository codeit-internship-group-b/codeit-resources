"use client";

import { createPortal } from "react-dom";
import { motion } from "framer-motion";
import { type ReactNode, useRef, type MouseEvent, type KeyboardEvent } from "react";
import { type ModalProps } from "@ui/src/types/ModalType";
import { useModalContext } from "./Root";

interface ModalContentProps extends ModalProps {
  children: ReactNode;
  className?: string;
}

export default function ModalContent(props: ModalContentProps): JSX.Element {
  const { children, className } = props;
  const { open: currentOpenState, handleOpenChange } = useModalContext();
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClickOverlay = (event: MouseEvent<HTMLDivElement>): void => {
    if (overlayRef.current && overlayRef.current === event.target) {
      handleOpenChange(false);
    }
  };

  const handleKeyDownOverlay = (event: KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === "Escape" || event.key === " ") {
      handleOpenChange(false);
    }
  };

  const renderPortal = (): JSX.Element | null => {
    if (currentOpenState) {
      return createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed z-50"
        >
          <div
            ref={overlayRef}
            role="button"
            tabIndex={0}
            className="bg-custom-black/70 fixed inset-0 flex items-center justify-center"
            onClick={handleClickOverlay}
            onKeyDown={handleKeyDownOverlay}
          >
            <div
              className={`max-w-340 md:max-w-370 rounded-16 relative z-50 h-auto w-auto flex-col bg-white px-32 py-24 ${String(className)}`}
            >
              {children}
            </div>
          </div>
        </motion.div>,
        document.body,
      );
    }
    return null;
  };

  return <>{renderPortal()}</>;
}

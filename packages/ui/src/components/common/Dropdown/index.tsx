import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { div } from "framer-motion/client";
import cn from "@ui/src/utils/cn";
import ErrorMessage from "../../ErrorMessage";
import { RightIcon } from "@ui/public";

const DropdownContext = createContext({
  isOpen: false,
  isError: false,
  errorMessage: "",
  selectedValue: "",
  toggleDropdown: () => {},
  closeDropdown: () => {},
  selectedItem: (value: string) => {},
});

interface DropdownProps {
  children: ReactNode;
  selectedValue: string;
  onSelect: (value: string) => void;
  isError?: boolean;
  errorMessage?: string;
}

export default function Dropdown({
  children,
  selectedValue,
  onSelect,
  isError = false,
  errorMessage = "",
}: DropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => setIsOpen((prev) => !prev), []);
  const closeDropdown = useCallback(() => setIsOpen(false), []);

  const selectedItem = useCallback(
    (value: string) => {
      onSelect(value);
      closeDropdown();
    },
    [onSelect, closeDropdown],
  );

  const providerValue = useMemo(
    () => ({ isOpen, isError, errorMessage, selectedValue, toggleDropdown, closeDropdown, selectedItem }),
    [isOpen, selectedValue, isError, errorMessage],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownRef]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeDropdown]);

  return (
    <DropdownContext.Provider value={providerValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface ToggleProps {
  children: ReactNode;
  title?: string;
}

function Toggle({ children, title }: ToggleProps) {
  const { toggleDropdown, selectedValue, isOpen, isError, errorMessage } = useContext(DropdownContext);

  return (
    <div className="relative group">
      {title && (
        <span
          className={cn(
            "!text-custom-black/80 absolute w-fit text-13 font-normal -top-8 left-16 z-20 bg-white px-4 transition-colors duration-300",
            isOpen && "!text-purple-400 text-13",
            isError && "!text-error text-13",
          )}
        >
          {title}
        </span>
      )}

      <button
        type="button"
        className={cn(
          "text-custom-black border-custom-black/40 w-full px-20 py-15 rounded-lg transition-colors duration-300 border border-solid",
          isOpen && "border-purple-400",
          isError && "border-error",
        )}
        onClick={toggleDropdown}
        onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleDropdown()}
      >
        {selectedValue ? selectedValue : <span>{children}</span>}
      </button>
      {isError && !isOpen && <ErrorMessage className="-bottom-30 left-20" message={errorMessage} />}
    </div>
  );
}

function Wrapper({ children }: { children: ReactNode }) {
  const { isOpen } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="relative top-8 p-8 border border-solid border-gray-border rounded-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Item({ children, value }: { children: ReactNode; value: string }) {
  const { selectedItem, selectedValue } = useContext(DropdownContext);
  const isSelected = selectedValue === value;

  return (
    <button
      className={`relative w-full px-12 py-6 hover:bg-gray-hover focus:bg-purple-700/5 focus:text-purple-800 rounded-8 ${
        isSelected
          ? "bg-purple-700/5 text-purple-800 hover:bg-purple-700/5" // 선택된 아이템에 대한 스타일
          : "" // 선택되지 않은 아이템에 대한 스타일
      }`}
      onClick={() => selectedItem(value)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && selectedItem(value)}
      role="button"
      tabIndex={0}
    >
      {children}
      {isSelected && <RightIcon className="absolute right-0 transform -translate-y-1/2" />}
    </button>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;

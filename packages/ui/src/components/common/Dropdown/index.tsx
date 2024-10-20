"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "@ui/src/utils/cn";
import ErrorMessage from "../ErrorMessage";
import { KebabIcon, RightIcon, SortIcon, TriangleIcon } from "@ui/public";
import { useEscapeKey } from "@ui/src/hooks/useEscapeKey";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";

const DropdownContext = createContext({
  isOpen: false,
  isError: false,
  errorMessage: "",
  selectedValue: "",
  size: "md",
  toggleDropdown: () => {},
  closeDropdown: () => {},
  // eslint-disable-next-line no-unused-vars
  selectedItem: (value: string) => {},
});

interface DropdownProps {
  children: ReactNode;
  selectedValue: string;
  size?: "sm" | "md";
  // eslint-disable-next-line no-unused-vars
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
  size = "md",
}: DropdownProps): JSX.Element {
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
    () => ({ isOpen, isError, errorMessage, selectedValue, size, toggleDropdown, closeDropdown, selectedItem }),
    [isOpen, selectedValue, isError, errorMessage, size, toggleDropdown, closeDropdown, selectedItem],
  );

  useOnClickOutside(dropdownRef, closeDropdown);
  useEscapeKey(closeDropdown, isOpen);

  return (
    <DropdownContext.Provider value={providerValue}>
      <div ref={dropdownRef} className="relative">
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

interface ToggleProps {
  children?: ReactNode;
  title?: string;
  iconType?: "none" | "kebab" | "sort";
}

function Toggle({ children, title, iconType = "none" }: ToggleProps): JSX.Element {
  const { toggleDropdown, selectedValue, isOpen, isError, errorMessage, size } = useContext(DropdownContext);

  return (
    <div className="group relative">
      {iconType === "kebab" && (
        <KebabIcon
          className="cursor-pointer"
          onClick={toggleDropdown}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleDropdown()}
        />
      )}
      {iconType === "sort" && (
        <button
          onClick={toggleDropdown}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleDropdown()}
          className="rounded-6 flex items-center gap-2 bg-gray-400 px-6 py-4"
        >
          <SortIcon />
          <span className="text-custom-black/60 text-12 font-medium">{selectedValue}</span>
        </button>
      )}
      {title && (
        <span
          className={cn(
            "!text-13 absolute -top-8 left-16 z-20 w-fit bg-white px-4 font-normal transition-colors duration-300",
            "text-custom-black/80",
            {
              "text-purple-400": isOpen,
              "text-error": isError,
            },
          )}
        >
          {title}
        </span>
      )}
      {iconType === "none" && (
        <>
          <button
            type="button"
            className={cn(
              "text-custom-black border-custom-black/40 flex items-center justify-between rounded-lg border border-solid bg-white transition-colors duration-300",
              isOpen && "border-purple-400",
              isError && "border-error",
              size === "md" ? "py-15 w-full px-20" : "w-96 gap-6 px-12 py-6",
            )}
            onClick={toggleDropdown}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleDropdown()}
            aria-expanded={isOpen}
          >
            {selectedValue ? selectedValue : <span>{children}</span>}
            <TriangleIcon
              className={cn(
                "transition-linear size-12",
                isOpen ? "animate-rotate-in rotate-180" : "animate-rotate-out",
              )}
            />
          </button>
          {isError && !isOpen && <ErrorMessage className="-bottom-30 left-20" message={errorMessage} />}
        </>
      )}
    </div>
  );
}

interface WrapperProps {
  children: ReactNode;
  className?: string;
}

function Wrapper({ children, className }: WrapperProps): JSX.Element {
  const { isOpen, size } = useContext(DropdownContext);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className={cn(
            "rounded-8 shadow-custom absolute z-50 border border-solid border-gray-500 bg-white p-8",
            size === "md" ? "top-64 w-full" : "w-96",
            className,
          )}
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

interface ItemProps {
  children: ReactNode;
  value: string;
  position?: "left" | "center";
}

function Item({ children, value, position = "center" }: ItemProps): JSX.Element {
  const { selectedItem, selectedValue, size } = useContext(DropdownContext);
  const isSelected = selectedValue === value;

  return (
    <button
      className={cn(
        "transition-linear text-custom-black/80 rounded-8 relative w-full px-12 py-6 hover:bg-gray-400 focus:bg-purple-700/5 focus:text-purple-900",
        {
          "bg-purple-700/5 !text-purple-900 hover:bg-purple-700/5": isSelected,
          "text-left": position === "left",
        },
        size === "md" ? "px-12 py-6" : "text-14 px-16 py-6",
      )}
      onClick={() => selectedItem(value)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && selectedItem(value)}
      role="button"
      tabIndex={0}
    >
      {children}
      {isSelected && size === "md" && (
        <RightIcon className="absolute right-8 top-1/2 -translate-y-1/2 transform fill-purple-700" />
      )}
    </button>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;

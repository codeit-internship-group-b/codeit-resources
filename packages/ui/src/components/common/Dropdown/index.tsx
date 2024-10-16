"use client";

import { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "@ui/src/utils/cn";
import ErrorMessage from "../../ErrorMessage";
import { KebabIcon, RightIcon, SortIcon, Triangle } from "@ui/public";

const DropdownContext = createContext({
  isOpen: false,
  isError: false,
  errorMessage: "",
  selectedValue: "",
  size: "md",
  select: "single",
  toggleDropdown: () => {},
  closeDropdown: () => {},
  // eslint-disable-next-line no-unused-vars
  selectedItem: (value: string) => {},
});

interface DropdownProps {
  children: ReactNode;
  selectedValue: string;
  size?: "sm" | "md";
  select?: "single" | "multi";
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
    [isOpen, selectedValue, isError, errorMessage, size],
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
  children?: ReactNode;
  title?: string;
  iconType?: "none" | "kebab" | "sort";
}

function Toggle({ children, title, iconType = "none" }: ToggleProps): JSX.Element {
  const { toggleDropdown, selectedValue, isOpen, isError, errorMessage, size } = useContext(DropdownContext);

  return (
    <div className="relative group">
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
          className="rounded-6 flex items-center gap-2 px-6 py-4 bg-gray-hover"
        >
          <SortIcon />
          <span className="font-medium text-custom-black/60 text-12">{selectedValue}</span>
        </button>
      )}
      {title && (
        <span
          className={cn(
            "absolute w-fit text-13 font-normal -top-10 left-16 z-20 bg-white px-4 transition-colors duration-300",
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
              "bg-white flex justify-between items-center text-custom-black border-custom-black/40 rounded-lg transition-colors duration-300 border border-solid",
              isOpen && "border-purple-400",
              isError && "border-error",
              size === "md" ? "w-full px-20 py-15" : "w-96 gap-6 px-12 py-6",
            )}
            onClick={toggleDropdown}
            onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && toggleDropdown()}
          >
            {selectedValue ? selectedValue : <span>{children}</span>}
            <Triangle
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
            "z-50 bg-white absolute p-8 border border-solid border-gray-border rounded-8 shadow-custom",
            size === "md" ? "w-full top-64" : "w-96",
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
        "text-custom-black/80 w-full relative px-12 py-6 transition-linear hover:bg-gray-hover focus:bg-purple-700/5 focus:text-purple-900 rounded-8",
        {
          "bg-purple-700/5 !text-purple-900 hover:bg-purple-700/5": isSelected,
          "text-left": position === "left",
        },
        size === "md" ? "px-12 py-6" : "px-16 py-6 text-14",
      )}
      onClick={() => selectedItem(value)}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && selectedItem(value)}
      role="button"
      tabIndex={0}
    >
      {children}
      {isSelected && size === "md" && <RightIcon className="absolute right-8 transform -translate-y-1/2 top-1/2" />}
    </button>
  );
}

Dropdown.Toggle = Toggle;
Dropdown.Wrapper = Wrapper;
Dropdown.Item = Item;

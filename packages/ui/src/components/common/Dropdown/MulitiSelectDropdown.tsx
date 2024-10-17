/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import React, {
  cloneElement,
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  Children,
  isValidElement,
  type ReactElement,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import cn from "@ui/src/utils/cn";
import { RightIcon, TriangleIcon, SearchIcon } from "@ui/public";

interface DropdownContextType {
  isOpen: boolean;
  selectedValue: string[];
  toggleDropdown: () => void;
  closeDropdown: () => void;
  selectedItem: (value: string) => void;
}

const DropdownContext = createContext<DropdownContextType>({
  isOpen: false,
  selectedValue: [] as string[],
  toggleDropdown: () => {
    // intentionally empty
  },
  closeDropdown: () => {
    // intentionally empty
  },
  selectedItem: (_value: string) => {
    // intentionally empty
  },
});

interface DropdownProps {
  children: ReactNode;
  selectedValue: string[];
  onSelect: (value: string[]) => void;
}

export default function MultiSelectDropdown({ children, selectedValue, onSelect }: DropdownProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);
  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const selectedItem = useCallback(
    (value: string) => {
      const newValue = selectedValue.includes(value)
        ? selectedValue.filter((item) => item !== value) // 이미 선택된 항목 해제
        : [...selectedValue, value]; // 선택되지 않은 항목 추가
      onSelect(newValue);
    },
    [onSelect, selectedValue],
  );

  const providerValue = useMemo(
    () => ({ isOpen, selectedValue, toggleDropdown, closeDropdown, selectedItem }),
    [isOpen, selectedValue, toggleDropdown, closeDropdown, selectedItem],
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef, closeDropdown]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
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
}
function Toggle({ children, title }: ToggleProps): JSX.Element {
  const { toggleDropdown, isOpen } = useContext(DropdownContext);

  return (
    <div className="group relative">
      <span
        className={cn(
          "!text-13 text-custom-black/80 absolute -top-8 left-16 z-20 w-fit bg-white px-4 font-normal transition-colors duration-300",
          {
            "text-purple-400": isOpen,
          },
        )}
      >
        {title}
      </span>
      <button
        type="button"
        className={cn(
          "text-custom-black border-custom-black/40 flex h-56 w-full items-center justify-between rounded-lg border border-solid bg-white px-20 py-16 transition-colors duration-300",
          {
            "border-purple-400": isOpen,
          },
        )}
        onClick={toggleDropdown}
        onKeyDown={(e) => {
          (e.key === "Enter" || e.key === " ") && toggleDropdown();
        }}
      >
        <span>{children}</span>
        <TriangleIcon
          className={cn("transition-linear size-12", isOpen ? "animate-rotate-in rotate-180" : "animate-rotate-out")}
        />
      </button>
    </div>
  );
}

interface WrapperProps {
  children: ReactNode;
}

function Wrapper({ children }: WrapperProps): JSX.Element {
  const { isOpen } = useContext(DropdownContext);
  const [searchTerm, setSearchTerm] = useState(""); // 검색어 상태

  const filteredChildren =
    Children.map(children, (child) => {
      if (isValidElement(child) && searchTerm) {
        const childWithProps = child as ReactElement<{ value?: string }>;
        const childValue = childWithProps.props.value?.toLowerCase() ?? "";
        if (childValue.includes(searchTerm.toLowerCase())) {
          return cloneElement(child);
        }
        return null;
      }
      return child;
    }) ?? [];

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className={cn(
            "border-gray-border rounded-8 shadow-custom absolute top-64 z-50 w-full border border-solid bg-white p-8",
          )}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div className="relative mb-4 p-4">
            <input
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
              }}
              className="rounded-8 pl-42 bg-gray-10 h-40 w-full border border-solid border-gray-100/30 focus:outline-none"
            />
            <SearchIcon className="absolute left-20 top-1/2 -translate-y-1/2 transform" />
          </div>
          {filteredChildren.length > 0 ? (
            filteredChildren
          ) : (
            <div className="py-10 text-center text-gray-400">일치하는 결과가 없습니다.</div>
          )}
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

interface ItemProps {
  children: ReactNode;
  value: string;
}

function Item({ children, value }: ItemProps): JSX.Element {
  const { selectedItem, selectedValue } = useContext(DropdownContext);
  const isSelected = selectedValue.includes(value);
  return (
    <button
      type="button"
      className="text-custom-black/80 transition-linear hover:bg-gray-hover rounded-8 relative flex w-full items-center gap-8 px-12 py-6 focus:bg-transparent"
      onClick={() => {
        selectedItem(value);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          selectedItem(value);
        }
      }}
      tabIndex={0}
    >
      {isSelected ? (
        <span className="border-custom-black/20 rounded-2 relative size-20 border border-solid bg-purple-700">
          <RightIcon className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform fill-white" />
        </span>
      ) : (
        <span className="border-custom-black/20 rounded-2 block size-20 border border-solid bg-white/40" />
      )}
      {children}
    </button>
  );
}

MultiSelectDropdown.Toggle = Toggle;
MultiSelectDropdown.Wrapper = Wrapper;
MultiSelectDropdown.Item = Item;

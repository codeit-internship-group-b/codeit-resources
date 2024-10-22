import { BurgerIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { type ReactNode } from "react";

interface ListItemProps {
  children: ReactNode;
  type: "team" | "member";
  isModify?: boolean;
  onClick?: () => void;
}

export default function ListItem({ children, isModify, onClick }: ListItemProps): JSX.Element {
  return (
    <div
      className={cn(
        "rounded-12 mb-16 flex h-72 items-center justify-between border border-solid border-gray-200/10 px-24 py-16",
        "transition-colors duration-300",
        {
          "border-custom-black": isModify,
        },
      )}
    >
      <BurgerIcon className="mr-32 cursor-pointer" onClick={onClick} />
      {children}
    </div>
  );
}

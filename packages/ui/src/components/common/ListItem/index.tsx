import { BurgerIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { type ReactNode } from "react";

interface ListItemProps {
  children: ReactNode;
  thickness?: "thin" | "thick";
  color?: "white" | "gray";
  isModify?: boolean;
  onClick?: () => void;
  showHamburger?: boolean;
}

/**
 * ListItem 컴포넌트는 항목을 목록 형태로 표시하며,
 * 두께와 배경 색상을 선택할 수 있는 옵션을 제공합니다.
 *
 * @param children - 항목에 표시될 내용.
 * @param thickness - 두께를 설정합니다. 기본값은 "thick"입니다.
 * @param color - 배경 색상을 설정합니다. 기본값은 "white"입니다.
 * @param isModify - 수정 상태인지 여부를 나타냅니다. 수정 상태일 때는 테두리 색상이 변경됩니다.
 * @param onClick - 버거 아이콘 클릭 시 호출되는 콜백 함수입니다.
 * @returns JSX.Element - 목록 항목을 구성하는 JSX 요소를 반환합니다.
 */

export default function ListItem({
  thickness = "thick",
  color = "white",
  children,
  isModify,
  onClick,
  showHamburger = true,
}: ListItemProps): JSX.Element {
  return (
    <div
      className={cn(
        "rounded-12 mb-16 flex items-center justify-between border border-solid border-gray-200/10 px-24 py-16 transition-colors duration-300",
        {
          "border-custom-black": isModify,
        },
        color === "white" ? "bg-white" : "bg-gray-60",
        thickness === "thick" ? "h-72" : "h-56",
      )}
    >
      {showHamburger && <BurgerIcon className="mr-32 cursor-pointer" onClick={onClick} />}
      {children}
    </div>
  );
}

import React, { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import cn from "@ui/src/utils/cn";
import { LogoCodeitIcon, SpinnerIcon } from "@ui/public";

interface ButtonProps {
  variant: "Action" | "Primary" | "Secondary" | "Tertiary" | "TertiaryColor" | "Text" | "TextColor";
  isActive?: boolean;
  isPending?: boolean;
  className?: string;
  children: ReactNode;
}

type PolymorphicButtonProps<C extends ElementType> = ButtonProps & {
  as?: C;
} & Omit<ComponentPropsWithoutRef<C>, keyof ButtonProps>;

/**
 * Button 컴포넌트는 다양한 스타일 변형(variant)을 가진 다형성(polymorphic) 컴포넌트입니다.
 * as prop을 통해 렌더링할 요소를 지정할 수 있으며, 사용자가 전달한 props에 따라 버튼의 스타일과 동작을 정의합니다.
 *
 * @template C - 렌더링할 요소의 타입 (React.ElementType)
 *
 * @param {PolymorphicButtonProps<C>} props - 버튼 컴포넌트의 속성들
 * @param {C} [props.as='button'] - 렌더링할 요소를 지정합니다.
 * @param {"Action" | "Primary" | "Secondary" | "Tertiary" | "TertiaryColor" | "Text" | "TextColor"} props.variant - 버튼의 변형 스타일을 지정합니다.
 * @param {boolean} [props.isActive=true] - 버튼의 활성화 여부를 지정합니다. 비활성화 시 특정 스타일이 적용됩니다.
 * @param {boolean} [props.isPending=false] - 버튼의 로딩(수정 중) 상태를 지정합니다.
 * @param {string} [props.className] - 추가적인 사용자 정의 클래스 이름을 지정할 수 있습니다.
 * @param {React.ReactNode} props.children - 버튼 내부에 렌더링할 콘텐츠를 지정합니다.
 * @param {...*} rest - 렌더링할 요소에 적용 가능한 나머지 속성들입니다.
 *
 * @example
 * // 기본 사용 예시 (button 요소로 렌더링)
 * <Button variant="Primary">Primary Button</Button>
 *
 * @example
 * // 링크로 사용 예시 (a 요소로 렌더링)
 * <Button as="a" href="#" variant="primary">Link Button</Button>
 *
 * @example
 * // 비활성화된 secondary 버튼
 * <Button variant="Secondary" isActive={false}>Disabled Secondary Button</Button>
 *
 * @example
 * // 수정 중 상태의 버튼
 * <Button variant="Primary" isPending={true}>Save</Button>
 *
 * @author
 * 배영준
 */

export default function Button<C extends ElementType = "button">(props: PolymorphicButtonProps<C>) {
  const {
    as: Component = "button",
    variant,
    isActive = true,
    isPending = false,
    className = "",
    children,
    ...rest
  } = props;

  // 공통 스타일
  const baseStyles = "center flex items-center justify-center transition-all duration-300 ease-linear transform";

  // 비활성화 상태일 때 공통 스타일
  const inactiveStyles = "bg-gray-200/10 text-custom-black/30 cursor-not-allowed hover:bg-gray-200/10";

  // 변형별 기본 스타일
  const variantStyles: Record<ButtonProps["variant"], string> = {
    Action:
      "text-lg-bold md:text-2lg-bold h-40 w-full rounded-lg border-2 px-20 py-8 text-center md:h-48 md:px-32 md:py-10 md:w-auto border-custom-black",
    Primary:
      "min-w-68 h-32 text-sm-medium md:min-w-84 md:h-40 md:text-md-medium lg:min-w-100 lg:h-42 gap-4 rounded-8 px-12 py-6 md:rounded-lg md:px-16 md:py-8 lg:px-24 lg:py-8",
    Secondary:
      "min-w-68 h-32 text-sm-medium md:min-w-84 md:h-40 md:text-md-medium lg:min-w-100 lg:h-42 gap-4 rounded-8 border-1 border-custom-black/20 px-12 py-6 md:rounded-lg md:px-16 md:py-8 lg:px-24 lg:py-8",
    Tertiary:
      "h-24 px-10 py-4 rounded-full gap-4 md:h-28 md:px-12 md:py-4 md:gap-4 lg:h-32 lg:px-16 lg:py-5 border-1 border-custom-black/20 text-xxs-medium md:text-xs-medium lg:text-md-medium",
    TertiaryColor:
      "h-24 px-10 py-4 rounded-full gap-4 md:h-28 md:px-12 md:py-4 md:gap-4 lg:h-32 lg:px-16 lg:py-5 border-1 border-purple-700/40 text-xxs-medium",
    Text: "h-28 py-4 px-6 gap-2 rounded-6 text-xs-medium md:h-32 md:py-4 md:px-8 md:text-md-medium md:gap-4",
    TextColor: "h-28 py-4 px-6 gap-2 rounded-6 text-xs-medium md:h-32 md:py-4 md:px-8 md:text-md-medium md:gap-4",
  };

  // 변형별 활성화 상태일 때 스타일
  const activeStyles: Record<ButtonProps["variant"], string> = {
    Action: "bg-purple-400 text-white/90 hover:bg-purple-800 hover:text-white",
    Primary: "bg-purple-400 text-white hover:bg-purple-800",
    Secondary: "bg-white/40 text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black",
    Tertiary: "bg-white/40 text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black",
    TertiaryColor: "bg-white/40 text-purple-700 hover:bg-purple-700/40 hover:text-purple-900",
    Text: "bg-white/0 text-custom-black/80 hover:text-custom-black hover:bg-custom-black/5",
    TextColor: "bg-white/0 text-purple-900 hover:text-purple-600 hover:bg-purple-700/10",
  };

  // 스피너 아이콘 스타일
  const spinnerStyles = "animate-spin text-current transition-opacity duration-300 w-20 h-20";

  // 버튼의 실제 활성화 상태를 결정
  const isButtonActive = isActive && !isPending;

  // 최종 클래스 이름 조합
  const classes = cn(
    baseStyles,
    variantStyles[variant],
    isButtonActive ? activeStyles[variant] : inactiveStyles,
    className,
  );

  return (
    <Component className={classes} {...rest} disabled={!isActive || isPending}>
      <div className={cn("flex items-center transition-all duration-300", isPending ? "gap-10" : "gap-0")}>
        {isPending && <SpinnerIcon className={spinnerStyles} />}
        <span className="transition-all duration-300">{children}</span>
      </div>
    </Component>
  );
}

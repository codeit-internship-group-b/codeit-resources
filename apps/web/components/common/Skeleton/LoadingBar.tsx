interface LoadingBarProps {
  classNames?: string;
}

/**
 * LoadingBar 컴포넌트는 로딩 상태를 나타내는 바(bar)를 표시합니다.
 *
 * @param classNames - 로딩 바의 너비를 설정하는 클래스명. 기본값은 "w-100"입니다.
 * @returns 로딩 바 컴포넌트의 JSX 요소를 반환합니다.
 */

export default function LoadingBar({ classNames = "w-100 h-12" }: LoadingBarProps): JSX.Element {
  return <div className={`bg-gray-10 rounded-4 animate-pulse ${classNames}`} />;
}

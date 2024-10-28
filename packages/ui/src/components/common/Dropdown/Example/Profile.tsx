import { clsx } from "clsx";
import { ProfileDefaultIcon } from "@ui/public";

interface ProfileProps {
  size?: string;
  src?: string;
  name?: string;
  className?: string;
  textColor?: "white" | "black";
}

/**
 * Profile 컴포넌트는 사용자 프로필을 표시하는 역할을 합니다.
 *
 * @param size - 프로필 이미지의 크기를 결정하는 클래스명. 기본값은 "size-32"입니다.
 * @param src - 프로필 이미지의 경로.
 * @param name - 사용자의 이름.
 * @param className - 추가적으로 적용할 클래스명.
 * @param textColor - 이름의 색상. 기본은 하얀색.
 * @returns 프로필 컴포넌트 JSX 요소를 반환합니다.
 */

export default function Profile({
  size = "size-32",
  src,
  name,
  className,
  textColor = "white",
}: ProfileProps): JSX.Element {
  return (
    <div className={clsx(name && "flex items-center gap-10", className)}>
      {src ? (
        <div className={`relative ${size}`}>
          <img src={src} alt="프로필 이미지" className="fill" />
        </div>
      ) : (
        <ProfileDefaultIcon className={size} />
      )}
      {name ? (
        <div
          className={clsx("font-medium", {
            "text-white": textColor === "white",
            "text-custom-black": textColor === "black",
          })}
        >
          {name}
        </div>
      ) : null}
    </div>
  );
}

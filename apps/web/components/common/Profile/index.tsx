import { memo, useState } from "react";
import { clsx } from "clsx";
import Image from "next/image";
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
 * @param src - 프로필 이미지의 경로.
 * @param name - 사용자의 이름.
 * @param className - 추가적으로 적용할 클래스명.
 * @param textColor - 이름의 색상. 기본은 하얀색.
 * @returns 프로필 컴포넌트 JSX 요소를 반환합니다.
 */

function Profile({ src, name, className, textColor = "white" }: ProfileProps): JSX.Element {
  const [isError, setIsError] = useState(false);

  const renderImage =
    isError || !src ? (
      <ProfileDefaultIcon className="h-32 w-32 rounded-full" />
    ) : (
      <Image
        src={src}
        width={32}
        height={32}
        style={{ borderRadius: 9999 }}
        onError={() => {
          setIsError(true);
        }}
        alt="프로필 이미지"
      />
    );

  return (
    <div className={clsx(name && "flex items-center gap-10", className)}>
      {renderImage}
      <div
        className={clsx("font-medium", {
          "text-white": textColor === "white",
          "text-custom-black": textColor === "black",
        })}
      >
        {name}
      </div>
    </div>
  );
}

export default memo(Profile);

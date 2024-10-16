import { ProfileEmpty } from "@ui/public";
import { clsx } from "clsx";
import Image from "next/image";

interface ProfileProps {
  size?: string;
  src?: string;
  name?: string;
  className?: string;
}

/**
 * Profile 컴포넌트는 사용자 프로필을 표시하는 역할을 합니다.
 *
 * @param size - 프로필 이미지의 크기를 결정하는 클래스명. 기본값은 "size-32"입니다.
 * @param src - 프로필 이미지의 경로.
 * @param name - 사용자의 이름.
 * @param className - 추가적으로 적용할 클래스명.
 * @returns 프로필 컴포넌트 JSX 요소를 반환합니다.
 */

export default function Profile({ size = "size-32", src, name, className }: ProfileProps): JSX.Element {
  return (
    <div className={clsx(name && "flex items-center gap-10", className)}>
      {src ? (
        <div className={`relative ${size}`}>
          <Image src={src} fill alt="프로필 이미지" />
        </div>
      ) : (
        <ProfileEmpty width={32} height={32} />
      )}
      {name ? <div className="font-medium text-white">{name}</div> : null}
    </div>
  );
}

import { ProfileEmpty } from "@ui/public";
import Image from "next/image";

interface Props {
  size?: string;
  src?: string;
  name?: string;
}

export default function Profile({ size = "size-32", src, name }: Props) {
  return (
    <div className="flex gap-10 items-center">
      {src ? (
        <div className={`relative ${size}`}>
          <Image src={src} fill alt="프로필 이미지" />
        </div>
      ) : (
        <ProfileEmpty width={32} height={32} />
      )}
      {name ? <div className="text-white font-medium">{name}</div> : null}
    </div>
  );
}

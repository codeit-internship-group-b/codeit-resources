import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { type StaticImageData } from "next/image";

interface BaseMember {
  id?: string | number;
  name: string;
  email: string;
  teams: string[];
  role: string;
}

export interface MemberWithStaticImage extends BaseMember {
  profileImage: StaticImageData | null | File;
}

export interface MemberWithStaticImport extends BaseMember {
  profileImage: StaticImport | string;
}

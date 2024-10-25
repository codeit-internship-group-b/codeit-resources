import { type StaticImport } from "next/dist/shared/lib/get-img-props";
import { type StaticImageData } from "next/image";

export interface MemberWithStaticImage {
  id?: string;
  name: string;
  email: string;
  teams: string[];
  role: string;
  profileImage: StaticImageData | null | File;
}

export interface MemberWithStaticImport {
  id?: string;
  name: string;
  email: string;
  teams: string[];
  role: string;
  profileImage: StaticImport | string;
}

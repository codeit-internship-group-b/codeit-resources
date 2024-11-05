import { type IUser } from "@repo/types";
import { type StaticImport } from "next/dist/shared/lib/get-img-props";

type BaseImageType = string | StaticImport | null;

type ProfileImageType = BaseImageType | File;

// 리스트용 멤버 타입 (File 제외)
export type MemberWithStaticImage = Omit<IUser, "profileImage"> & {
  profileImage?: BaseImageType;
};

// 사이드 패널용 멤버 타입 (모든 타입 허용)
export type MemberWithFileImage = Omit<IUser, "profileImage"> & {
  profileImage?: ProfileImageType;
};

// 사이드 패널 폼 데이터 타입 (필수 필드)
export type SidePanelFormData = Omit<
  IUser,
  "_id" | "createdAt" | "updatedAt" | "department" | "password" | "profileImage"
> & {
  profileImage: ProfileImageType;
};

export const SORT_OPTIONS = {
  NEWEST: "newest",
  OLDEST: "oldest",
  ALPHABETICAL: "alphabetical",
} as const;

export type SortOption = (typeof SORT_OPTIONS)[keyof typeof SORT_OPTIONS];

export const SORT_LABELS: Record<SortOption, string> = {
  newest: "최신순",
  oldest: "오래된순",
  alphabetical: "가나다순",
} as const;

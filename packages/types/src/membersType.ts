import { type StaticImageData } from "next/image";
import { IUser } from "./userType";

// 이미지 타입
export type ImageUrlType = string;
export type StaticImageType = StaticImageData;
export type ImageFileType = File;
export type DisplayImageType = ImageUrlType | StaticImageType;
export type FormImageType = DisplayImageType | ImageFileType | null;

// 멤버 타입
export type MemberWithStaticImage = Omit<IUser, "profileImage"> & {
  profileImage?: DisplayImageType;
};
export type MemberWithFileImage = Omit<IUser, "profileImage"> & {
  profileImage?: FormImageType;
};

// 폼 타입
export type SidePanelFormData = Omit<
  IUser,
  "_id" | "createdAt" | "updatedAt" | "department" | "password" | "profileImage"
> & {
  profileImage: FormImageType;
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

export const ROLE_OPTIONS = {
  MEMBER: "member",
  ADMIN: "admin",
} as const;

export type RoleOption = (typeof ROLE_OPTIONS)[keyof typeof ROLE_OPTIONS];

export const ROLE_LABELS: Record<RoleOption, string> = {
  member: "멤버",
  admin: "어드민",
} as const;

export type GetMembersResponse = MemberWithStaticImage[];

export interface ResponseWithMessage {
  message: string;
}

export interface MemberResponse extends ResponseWithMessage {
  user: IUser;
}

export interface MembersResponse extends ResponseWithMessage {
  members: IUser[];
  nextCursor: string | null;
}

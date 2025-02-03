import { type StaticImageData } from "next/image";

export type ImageUrlType = string;
export type StaticImageType = StaticImageData;
export type ImageFileType = File;
export type DisplayImageType = ImageUrlType | StaticImageType;
export type FormImageType = DisplayImageType | ImageFileType | null;
export type ImageSize = "sm" | "md";

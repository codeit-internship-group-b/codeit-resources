import { useState, useEffect, type ChangeEvent } from "react";
import Image from "next/image";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import { type ImageFileType, type DisplayImageType, type FormImageType } from "@repo/types/src/membersType";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import { IMAGE_CONFIG } from "@repo/constants";

interface ProfileImageUploaderProps {
  currentImage: FormImageType;
  onImageChange?: (file: ImageFileType) => void;
  size?: "sm" | "md";
}

export default function ProfileImageUploader({
  currentImage,
  onImageChange,
  size = "md",
}: ProfileImageUploaderProps): JSX.Element {
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");
  const [isImageError, setIsImageError] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newObjectUrl = URL.createObjectURL(file);
    setImageObjectUrl(newObjectUrl);
    onImageChange?.(file);
  };

  const getImageSource = (): DisplayImageType => {
    if (isImageError) {
      return DefaultProfileImage;
    }

    if (currentImage instanceof File) {
      return imageObjectUrl;
    }

    if (typeof currentImage === "string") {
      return currentImage;
    }

    return DefaultProfileImage;
  };

  const handleError = (): void => {
    setIsImageError(true);
  };

  useEffect(() => {
    if (imageObjectUrl) URL.revokeObjectURL(imageObjectUrl);
  }, [imageObjectUrl]);

  return (
    <div className="flex items-center gap-16 md:gap-24">
      <Image
        src={getImageSource()}
        alt={currentImage ? MEMBER_FORM_MESSAGES.IMAGE.PREVIEW_ALT : MEMBER_FORM_MESSAGES.IMAGE.DEFAULT_ALT}
        width={size === "sm" ? 72 : 120}
        height={size === "sm" ? 72 : 120}
        placeholder="blur"
        blurDataURL={IMAGE_CONFIG.BLUR_DATA_URL}
        onError={handleError}
        className={`rounded-full object-cover ${size === "sm" ? "size-72" : "size-120"}`}
      />
      <label
        htmlFor="profileImage"
        className="w-86 border-custom-black/20 rounded-6 text-sm-medium text-custom-black/80 flex h-32 cursor-pointer items-center justify-center border transition-colors duration-300 hover:border-purple-400 hover:text-purple-400"
      >
        {MEMBER_FORM_MESSAGES.BUTTON.UPLOAD_PHOTO}
        <input
          id="profileImage"
          type="file"
          accept=".png, .jpeg, .jpg"
          className="hidden"
          onChange={handleImageUpload}
        />
      </label>
    </div>
  );
}

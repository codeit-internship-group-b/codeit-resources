"use client";

import { useState, useEffect, type ChangeEvent } from "react";
import Image from "next/image";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import { IMAGE_CONFIG, IMAGE_SIZES } from "@repo/constants";
import cn from "@ui/src/utils/cn";
import { type ImageFileType, type DisplayImageType, type FormImageType, type ImageSize } from "@/app/types/ImageType";

interface ProfileImageUploaderProps {
  currentImage: FormImageType;
  onImageChange?: (file: ImageFileType) => void;
  size?: ImageSize;
}

export default function ProfileImageUploader({ currentImage, onImageChange }: ProfileImageUploaderProps): JSX.Element {
  const [imageObjectUrl, setImageObjectUrl] = useState("");
  const [isImageError, setIsImageError] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    const newObjectUrl = URL.createObjectURL(file);
    setImageObjectUrl(newObjectUrl);
    onImageChange?.(file);
  };

  const getImageSource = (): DisplayImageType => {
    if (isImageError || !currentImage) {
      return DefaultProfileImage;
    }

    if (currentImage instanceof File) {
      return imageObjectUrl;
    }

    return currentImage;
  };

  const handleError = (): void => {
    setIsImageError(true);
  };

  useEffect(() => {
    return () => {
      if (imageObjectUrl) URL.revokeObjectURL(imageObjectUrl);
    };
  }, [imageObjectUrl]);

  return (
    <div className="flex items-center gap-16 md:gap-24">
      <Image
        src={getImageSource()}
        alt={currentImage ? MEMBER_FORM_MESSAGES.IMAGE.PREVIEW_ALT : MEMBER_FORM_MESSAGES.IMAGE.DEFAULT_ALT}
        width={IMAGE_SIZES.MD}
        height={IMAGE_SIZES.MD}
        placeholder="blur"
        blurDataURL={IMAGE_CONFIG.BLUR_DATA_URL}
        onError={handleError}
        className={`rounded-full object-cover size-${IMAGE_SIZES.MD}`}
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

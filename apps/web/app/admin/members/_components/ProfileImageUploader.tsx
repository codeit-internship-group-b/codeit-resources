import { useState, useEffect, type ChangeEvent } from "react";
import Image from "next/image";
import { notify } from "@ui/index";
import { BLUR_DATA_URL, IMAGE_TYPES, MAX_SIZE } from "@repo/ui/src/utils/constants/image";
import { TOAST_MESSAGES, MEMBER_FORM_MESSAGES } from "@repo/ui/src/utils/constants/notificationMessage";
import DefaultProfileImage from "@ui/public/images/image_default_profile.png";
import { type ImageFileType, type DisplayImageType, type FormImageType } from "../types";

interface ProfileImageUploaderProps {
  currentImage: FormImageType;
  onImageChange: (file: ImageFileType) => void;
}

export default function ProfileImageUploader({ currentImage, onImageChange }: ProfileImageUploaderProps): JSX.Element {
  const [imageObjectUrl, setImageObjectUrl] = useState<string>("");
  const [isImageError, setIsImageError] = useState(false);

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!IMAGE_TYPES.includes(file.type)) {
      notify({
        type: "error",
        message: TOAST_MESSAGES.INVALID_IMAGE_TYPE,
      });
      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      notify({
        type: "error",
        message: TOAST_MESSAGES.INVAILD_IMAGE_SIZE,
      });
      e.target.value = "";
      return;
    }

    const newObjectUrl = URL.createObjectURL(file);
    setImageObjectUrl(newObjectUrl);
    onImageChange(file);
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
    return () => {
      if (imageObjectUrl) {
        URL.revokeObjectURL(imageObjectUrl);
      }
    };
  }, [imageObjectUrl]);

  return (
    <div className="mb-[262px] flex items-center gap-24">
      <Image
        src={getImageSource()}
        alt={currentImage ? MEMBER_FORM_MESSAGES.IMAGE.PREVIEW_ALT : MEMBER_FORM_MESSAGES.IMAGE.DEFAULT_ALT}
        width={120}
        height={120}
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        onError={handleError}
        className="size-120 rounded-full object-cover"
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

import { useEffect, useState } from "react";
import { useChangeUserImageMutation } from "./useUserMutations";

interface UseProfileImageResult {
  handleImageChange: (file: File) => void;
  currentImage: string | File;
}

export const useProfileImage = (initialImage: string): UseProfileImageResult => {
  const [currentImage, setCurrentImage] = useState<string | File>(initialImage);
  const { mutate: changeUserImageMutate } = useChangeUserImageMutation();

  useEffect(() => {
    if (currentImage instanceof File) {
      const formData = new FormData();
      formData.append("profileImage", currentImage);
      changeUserImageMutate(formData);
    }
  }, [changeUserImageMutate, currentImage]);

  const handleImageChange = (file: File): void => {
    setCurrentImage(file);
  };

  return { handleImageChange, currentImage };
};

import { type ChangeEvent } from "react";
import { type StaticImageData } from "next/image";

export interface MemberFormData {
  role: string;
  name: string;
  email: string;
  teams: string[];
  profileImage: File | null | StaticImageData;
}

export interface MemberFormProps {
  formData: MemberFormData;
  onRoleChange: (role: string) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTeamsSelect: (teams: string[]) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEdit?: boolean;
}

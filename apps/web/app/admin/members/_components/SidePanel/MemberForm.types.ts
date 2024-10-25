import { type ChangeEvent } from "react";
import { type MemberWithStaticImage, type MemberWithStaticImport } from "../ComponentWithUseClient.types";

export interface MemberFormProps {
  formData: MemberWithStaticImage | MemberWithStaticImport;
  onRoleChange: (role: string) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onTeamsSelect: (teams: string[]) => void;
  onImageUpload: (e: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  isEdit?: boolean;
}

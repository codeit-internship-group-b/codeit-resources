import { type StaticImageData } from "next/image";
import { type Member } from "../../mockData";

export interface AddMemberSidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: Member | null;
}

export interface MemberFormData {
  role: string;
  name: string;
  email: string;
  teams: string[];
  profileImage: File | null | StaticImageData;
}

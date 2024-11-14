import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import type { SidePanelFormData, MemberWithFileImage } from "@repo/types/src/membersType";
import { useMembersMutations } from "../../_hooks/useMembersMutations";
import PanelHeader from "./Header";
import MemberForm from "./Form";

export interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: MemberWithFileImage | null;
}

export const initialFormData: SidePanelFormData = {
  role: "member",
  name: "",
  email: "",
  teams: [],
  profileImage: null,
};

export default function SidePanel({ isOpen, onClose, selectedMember }: SidePanelProps): JSX.Element {
  const sidePanelRef = useRef<HTMLDivElement>(null);
  const form = useForm<SidePanelFormData>({ defaultValues: initialFormData });
  const { handleSubmitMutation, removeMember, isPending } = useMembersMutations({
    onSuccess: onClose,
  });

  const handleSubmit = (data: SidePanelFormData): void => {
    const formData = new FormData();
    formData.append("role", data.role);
    formData.append("name", data.name);
    formData.append("email", data.email);
    data.teams.forEach((team) => {
      formData.append("teams", team);
    });

    if (data.profileImage instanceof File) {
      formData.append("profileImage", data.profileImage);
    }

    handleSubmitMutation({ formData, selectedMember });
  };

  const handleWithdraw = (): void => {
    if (!selectedMember) return;
    removeMember(selectedMember._id);
  };

  useOnClickOutside(sidePanelRef, () => {
    if (isOpen) onClose();
  });

  // 멤버 수정 시, 폼 데이터 초기화 및 사이드 패널 상태 관리
  useEffect(() => {
    if (!isOpen) {
      const timer = setTimeout(() => {
        form.reset(initialFormData);
      }, 100);

      return () => {
        clearTimeout(timer);
      };
    } else if (selectedMember) {
      form.reset({
        role: selectedMember.role,
        name: selectedMember.name,
        email: selectedMember.email,
        teams: selectedMember.teams,
        profileImage: selectedMember.profileImage ?? null,
      });
    }
  }, [isOpen, selectedMember, form.reset, form]);

  return (
    <div
      ref={sidePanelRef}
      className={`md:w-414 border-custom-black/20 fixed right-0 top-0 z-10 h-full w-full transform border-l bg-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <PanelHeader selectedMember={selectedMember} onClose={onClose} onWithdraw={handleWithdraw} />
      <div className="mx-32 mb-40">
        <MemberForm form={form} isPending={isPending} selectedMember={selectedMember} onSubmit={handleSubmit} />
      </div>
    </div>
  );
}

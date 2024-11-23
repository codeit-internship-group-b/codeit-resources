import { useRef } from "react";
import { useOnClickOutside } from "@ui/src/hooks/useOnClickOutside";
import type { MemberWithFileImage } from "@repo/types/src/membersType";
import PanelHeader from "./Header";
import MemberForm from "./Form";

export interface SidePanelProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMember: MemberWithFileImage | null;
}

export default function SidePanel({ isOpen, onClose, selectedMember }: SidePanelProps): JSX.Element {
  const sidePanelRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(sidePanelRef, () => {
    if (isOpen) onClose();
  });

  return (
    <div
      ref={sidePanelRef}
      className={`md:w-414 border-custom-black/20 fixed right-0 top-0 z-10 h-full w-full transform border-l bg-white shadow-[0px_2px_14px_0px_rgba(0,0,0,0.08)] transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <PanelHeader selectedMember={selectedMember} onClose={onClose} />
      <div className="mx-32 mb-40">
        <MemberForm selectedMember={selectedMember} onClose={onClose} />
      </div>
    </div>
  );
}

import { DoubleChevron } from "@ui/public";
import { MEMBER_FORM_MESSAGES } from "@repo/constants/messages";
import { type MemberWithFileImage } from "@repo/types/src/membersType";
import { useMembersMutations } from "../../_hooks/useMembersMutations";

export interface PanelHeaderProps {
  selectedMember: MemberWithFileImage | null;
  onClose: () => void;
}

export default function PanelHeader({ selectedMember, onClose }: PanelHeaderProps): JSX.Element {
  const { removeMember } = useMembersMutations({
    onSuccess: onClose,
  });

  const handleWithdraw = (): void => {
    if (!selectedMember) return;
    removeMember(selectedMember._id);
  };

  return (
    <>
      <button onClick={onClose} type="button" className="mb-32 ml-16 mt-16 flex flex-row">
        <DoubleChevron />
      </button>
      <div className="mx-32">
        <div className={selectedMember ? "flex justify-between" : ""}>
          <h1 className="text-3xl-bold mb-32">
            {selectedMember ? MEMBER_FORM_MESSAGES.TITLE.UPDATE : MEMBER_FORM_MESSAGES.TITLE.ADD}
          </h1>
          {selectedMember ? (
            <button
              type="button"
              onClick={handleWithdraw}
              className="text-sm-medium text-custom-black/80 hover:bg-custom-black/5 hover:text-custom-black w-71 rounded-6 border-custom-black/20 h-32 border transition-all duration-300"
            >
              {MEMBER_FORM_MESSAGES.BUTTON.WITHDRAW}
            </button>
          ) : null}
        </div>
      </div>
    </>
  );
}

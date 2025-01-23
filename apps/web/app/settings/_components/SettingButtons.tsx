import { Chevron } from "@ui/public";
import { type ModalComponentType, type SettingsModalProps } from "@ui/src/types/ModalType";
import { useUserSettingOptions } from "../_hooks/useUserSettingOptions";
import { useModal } from "../_hooks/useModal";

export default function SettingButtons(): JSX.Element {
  const options = useUserSettingOptions();
  const { isOpen, currentModal: CurrentModal, openModal, closeModal } = useModal();

  const handleClick = (component: ModalComponentType<SettingsModalProps>): void => {
    openModal(component);
  };

  return (
    <>
      <div className="md:hidden">
        {options.map(({ title, component }) => (
          <button
            key={title}
            className="text-lg-medium border-b-1 flex w-full items-center justify-between border-[#E8E8EA] px-8 py-20"
            type="button"
            onClick={() => {
              handleClick(component);
            }}
          >
            {title}
            <div className="p-8">
              <Chevron className="rotate-180" />
            </div>
          </button>
        ))}
      </div>

      {CurrentModal ? <CurrentModal isOpen={isOpen} onClose={closeModal} /> : null}
    </>
  );
}

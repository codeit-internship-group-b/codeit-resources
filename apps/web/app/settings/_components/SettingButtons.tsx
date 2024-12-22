import { Chevron } from "@ui/public";
import { useState } from "react";
import { useAuthStore } from "@/src/stores/useAuthStore";
import ChangePasswordModal from "./modals/ChangePasswordModal";
import SettingsModals from "./modals/SettingsModals";

const MEMBER_OPTION = [{ title: "비밀번호 변경", modal: ChangePasswordModal }];
const ADMIN_OPTION = [{ title: "멤버 관리" }, { title: "팀 관리" }, { title: "회의실 설정" }, { title: "좌석 설정" }];

export default function SettingButtons(): JSX.Element {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const options = isAdmin ? [...MEMBER_OPTION, ...ADMIN_OPTION] : MEMBER_OPTION;

  const [isOpen, setIsOpen] = useState(false);
  const [currentTitle, setCurrentTitle] = useState("");

  const handleClick = (title: string): void => {
    setCurrentTitle(title);
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <div className="md:hidden">
        {options.map(({ title }) => (
          <button
            key={title}
            className="text-lg-medium border-b-1 flex w-full items-center justify-between border-[#E8E8EA] px-8 py-20"
            type="button"
            onClick={() => {
              handleClick(title);
            }}
          >
            {title}
            <div className="p-8">
              <Chevron className="rotate-180" />
            </div>
          </button>
        ))}
      </div>

      <SettingsModals
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
        currentTitle={currentTitle}
      />
    </>
  );
}

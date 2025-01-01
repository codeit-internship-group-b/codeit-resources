import { type ModalComponentType, type SettingsModalProps } from "@ui/src/types/ModalType";
import { useAuthStore } from "@/src/stores/useAuthStore";
import ChangePasswordModal from "../_components/modals/ChangePasswordModal";
import MembersSettingModal from "../_components/modals/MembersSettingModal";
import TeamSettingModal from "../_components/modals/TeamSettingModal";

interface Option {
  title: string;
  component: ModalComponentType<SettingsModalProps>;
}

const MEMBER_OPTION: Option[] = [{ title: "비밀번호 변경", component: ChangePasswordModal }];
const ADMIN_OPTION: Option[] = [
  { title: "멤버 관리", component: MembersSettingModal },
  { title: "팀 관리", component: TeamSettingModal },
  // { title: "회의실 설정" },
  // { title: "좌석 설정" },
];

export const useUserSettingOptions = (): Option[] => {
  const { user } = useAuthStore();
  const isAdmin = user?.role === "admin";
  const options = isAdmin ? [...MEMBER_OPTION, ...ADMIN_OPTION] : MEMBER_OPTION;

  return options;
};

"use client";

import { Button } from "@ui/index";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import ProfileInfo from "./ProfileInfo";
import SettingButtons from "./SettingButtons";
import ChangePasswordForm from "./ChangePasswordForm";

// TODO : querykey 상수화
// TODO : gnb settings페이지 연동

export default function ResponsiveSettingsPage(): JSX.Element {
  const isMobile = useIsMobileStore();

  return (
    <div className="md:max-w-372 flex w-full flex-col gap-56">
      <h1 className="text-2xl-bold md:hidden">설정</h1>
      <ProfileInfo />
      {isMobile ? <SettingButtons /> : <ChangePasswordForm />}
      <div className="flex flex-col gap-24">
        <h1 className="text-2xl-bold border-b-1 hidden border-[#E8E8EA] py-8 md:block">계정</h1>
        <Button className="text-lg-medium w-106 h-42" type="button" variant="Secondary">
          로그아웃
        </Button>
      </div>
    </div>
  );
}

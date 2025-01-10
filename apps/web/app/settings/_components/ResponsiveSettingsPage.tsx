"use client";

import { Button } from "@ui/index";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
// import ProfileInfo from "./ProfileInfo";
import { useAuthStore } from "@/app/store/useAuthStore";
import { notify } from "@/app/store/useToastStore";
import ErrorResetBoundary from "@/components/common/ErrorResetBoundary";
import ErrorFallback from "@/components/common/Fallback";
import { usePostMessageToRN } from "@/app/_hooks/usePostMessageToRN";
import SettingButtons from "./SettingButtons";
import ChangePasswordForm from "./ChangePasswordForm";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton";

const ProfileInfo = dynamic(() => import("./ProfileInfo"), {
  ssr: false,
  loading: () => <ProfileInfoSkeleton />,
});

// TODO : querykey 상수화
// TODO : suspense 401 server error 해결하기
// TODO : 비밀번호 입력값으로 적용되도록 수정
// TODO : AuthGuard 수정
// TODO : 회의실, 좌석 modal 추가 및 redirect 처리

export default function ResponsiveSettingsPage(): JSX.Element {
  const { logout } = useAuthStore();
  const router = useRouter();
  const postMessageToRN = usePostMessageToRN();

  const handleLogout = (): void => {
    logout();
    notify("success", "로그아웃 되었습니다.");
    postMessageToRN({
      type: "LOGOUT_SUCCESS",
      data: null,
    });
    router.replace(PAGE_NAME.SIGN_IN);
  };

  return (
    <ErrorResetBoundary fallbackComponent={ErrorFallback}>
      <div className="md:max-w-372 flex w-full flex-col gap-24 md:gap-56">
        <h1 className="text-2xl-bold md:hidden">설정</h1>
        <div className="flex flex-col gap-24 md:flex-col-reverse md:gap-16">
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfo />
          </Suspense>
          <h2 className="text-2xl-bold border-b-1 hidden border-[#E8E8EA] py-8 md:block">내 프로필</h2>
        </div>
        <SettingButtons />
        <div className="hidden md:block">
          <ChangePasswordForm />
        </div>
        <div className="flex flex-col gap-24">
          <h2 className="text-2xl-bold border-b-1 hidden border-[#E8E8EA] py-8 md:block">계정</h2>
          <Button className="text-lg-medium w-106 h-42" type="button" variant="Secondary" onClick={handleLogout}>
            로그아웃
          </Button>
        </div>
      </div>
    </ErrorResetBoundary>
  );
}

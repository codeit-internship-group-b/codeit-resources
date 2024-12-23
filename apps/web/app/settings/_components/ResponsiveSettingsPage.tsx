"use client";

import { Button } from "@ui/index";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
// import ProfileInfo from "./ProfileInfo";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { notify } from "@/app/store/useToastStore";
import SettingButtons from "./SettingButtons";
import ChangePasswordForm from "./ChangePasswordForm";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton";

const ProfileInfo = dynamic(() => import("./ProfileInfo"), {
  ssr: false,
  loading: () => <ProfileInfoSkeleton />,
});

// TODO : querykey 상수화
// TODO : suspense 401 server error 해결하기
// TODO : Error boundary 렌더 컴포넌트 제작
// TODO : 비밀번호 입력값으로 적용되도록 수정
// TODO : 다른페이지 responsive redirect 처리

export default function ResponsiveSettingsPage(): JSX.Element {
  const { logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = (): void => {
    logout();
    notify("success", "로그아웃 되었습니다.");
    router.replace(PAGE_NAME.SIGN_IN);
  };

  return (
    <div className="md:max-w-372 flex w-full flex-col gap-24 md:gap-56">
      <h1 className="text-2xl-bold md:hidden">설정</h1>
      <div className="flex flex-col gap-24 md:flex-col-reverse md:gap-16">
        <ErrorBoundary fallback={<ProfileInfoSkeleton />}>
          <Suspense fallback={<ProfileInfoSkeleton />}>
            <ProfileInfo />
          </Suspense>
        </ErrorBoundary>
        <h1 className="text-2xl-bold border-b-1 hidden border-[#E8E8EA] py-8 md:block">내 프로필</h1>
      </div>
      <SettingButtons />
      <div className="hidden md:block">
        <ChangePasswordForm />
      </div>
      <div className="flex flex-col gap-24">
        <h1 className="text-2xl-bold border-b-1 hidden border-[#E8E8EA] py-8 md:block">계정</h1>
        <Button className="text-lg-medium w-106 h-42" type="button" variant="Secondary" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>
    </div>
  );
}

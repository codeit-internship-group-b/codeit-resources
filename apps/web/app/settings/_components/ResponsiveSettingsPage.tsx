"use client";

import { Button } from "@ui/index";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import dynamic from "next/dynamic";
import useIsMobileStore from "@/app/store/useIsMobileStore";
// import ProfileInfo from "./ProfileInfo";
import SettingButtons from "./SettingButtons";
import ChangePasswordForm from "./ChangePasswordForm";
import ProfileInfoSkeleton from "./ProfileInfoSkeleton";

const ProfileInfo = dynamic(() => import("./ProfileInfo"), {
  ssr: false,
  loading: () => <ProfileInfoSkeleton />,
});

// TODO : querykey 상수화
// TODO : gnb settings페이지 연동
// TODO : profile teams 다시 적용하기
// TODO : suspense 401 server error 해결하기

export default function ResponsiveSettingsPage(): JSX.Element {
  const isMobile = useIsMobileStore();

  return (
    <div className="md:max-w-372 flex w-full flex-col gap-24 md:gap-56">
      <h1 className="text-2xl-bold md:hidden">설정</h1>
      <ErrorBoundary fallback={<ProfileInfoSkeleton />}>
        <Suspense fallback={<ProfileInfoSkeleton />}>
          <ProfileInfo />
        </Suspense>
      </ErrorBoundary>
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

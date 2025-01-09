"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { redirect, useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useWebView } from "../_hooks/useWebView";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();

  // 웹뷰 작업 추가
  const { isWebView } = useWebView();
  if (isWebView) redirect(PAGE_NAME.DASHBOARD);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PAGE_NAME.DASHBOARD);
    }

    setIsLoading(false);
  }, [isLoggedIn, router]);

  if (isLoading) return null;

  return isLoggedIn ? null : <SignInForm />;
}

"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { createWebViewEventListener } from "../../lib/bridge/createWebViewEventListener";
import { parseWebViewAuthMessage } from "../../lib/bridge/parseWebViewAuthMessage";
import { useDetectWebView } from "../_hooks/useDetectWebView";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();
  const { isIOSWebView, isAndroidWebView } = useDetectWebView();

  const webViewEventListener = createWebViewEventListener({ isIOSWebView, isAndroidWebView });

  useEffect(() => {
    webViewEventListener(parseWebViewAuthMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      const path = window.location.pathname;
      const isPrURL = path.includes("pr-");

      // 일반 URL인 경우
      if (path === "/") {
        router.replace(PAGE_NAME.DASHBOARD);
        return;
      }

      // PR preview URL인 경우
      if (isPrURL) {
        const isRootPath = path.endsWith("/") || /\/pr-\d+$/.exec(path);
        const targetPath = isRootPath ? `${path}/dashboard`.replace(/\/+/g, "/") : path;

        router.replace(targetPath);
      }
    }

    setIsLoading(false);
  }, [isLoggedIn, router]);

  if (isLoading) return null;

  return isLoggedIn ? null : <SignInForm />;
}

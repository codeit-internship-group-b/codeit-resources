"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { createWebViewEventListener } from "../../lib/bridge/createWebViewEventListener";
import { parseWebViewAuthMessage } from "../../lib/bridge/parseWebViewAuthMessage";
import { useDetectWebView } from "../_hooks/useDetectWebView";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();
  const { isIOSWebView, isAndroidWebView } = useDetectWebView();
  const webViewEventListener = createWebViewEventListener({ isIOSWebView, isAndroidWebView });

  useEffect(() => {
    webViewEventListener(parseWebViewAuthMessage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!isLoggedIn) {
      setIsLoading(false);
      return;
    }

    if (pathname === "/" && typeof window !== "undefined") {
      const urlParams = new URLSearchParams(window.location.search);
      const prNumber = urlParams.get("pr");

      if (prNumber) {
        router.replace(`/dashboard?pr=${prNumber}`);
      } else {
        router.replace(PAGE_NAME.DASHBOARD);
      }
    }

    setIsLoading(false);
  }, [isLoggedIn, router, pathname]);

  if (isLoading) return null;
  return isLoggedIn ? null : <SignInForm />;
}

"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRouter } from "next/navigation";
import { type IUser } from "@repo/types";
import { type WebviewMessageType } from "@ui/src/types/WebviewMessageTypes";
import { useAuthStore } from "@/app/store/useAuthStore";
import { useIsReactNativeWebview } from "../_hooks/useIsReactNativeWebview";
import webviewMessageBridge from "../utils/webviewLoginBridge";
import SignInForm from "./SignInForm";

interface WebViewMessageEventType {
  type: WebviewMessageType;
  data: { user: IUser; accessToken: string };
}

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();
  const isReactNativeWebview = useIsReactNativeWebview();

  if (isReactNativeWebview) {
    document.addEventListener("message", (event: Event) => {
      const { type, data } = JSON.parse((event as MessageEvent<string>).data) as WebViewMessageEventType;
      const handler = webviewMessageBridge.get(type);

      if (handler) {
        void handler(data);
      }
    });
    webviewMessageBridge.get("AUTO_LOGIN");
  }

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PAGE_NAME.DASHBOARD);
    }

    setIsLoading(false);
  }, [isLoggedIn, router]);

  if (isLoading) return null;

  return isLoggedIn ? null : <SignInForm />;
}

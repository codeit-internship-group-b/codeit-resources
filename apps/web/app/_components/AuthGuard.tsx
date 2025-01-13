"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/useAuthStore";
import { getMessagesFromNative } from "../utils/reactNativeMessage";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    getMessagesFromNative();
  }, []);

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PAGE_NAME.DASHBOARD);
    }

    setIsLoading(false);
  }, [isLoggedIn, router]);

  if (isLoading) return null;

  return isLoggedIn ? null : <SignInForm />;
}

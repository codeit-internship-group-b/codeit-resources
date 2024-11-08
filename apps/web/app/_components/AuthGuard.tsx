"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/src/stores/useAuthStore";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn } = useAuthStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PAGE_NAME.DASHBOARD);
    }

    setIsLoading(false);
  }, [isLoggedIn, router]);

  if (isLoading) return null;

  return isLoggedIn ? null : <SignInForm />;
}

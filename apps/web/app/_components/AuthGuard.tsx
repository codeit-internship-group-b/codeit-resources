"use client";

import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useRouter } from "next/navigation";
import { useAuthState } from "../_hooks/useAuthState";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const authState = useAuthState();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  const { isLoggedIn } = authState ?? { isLoggedIn: false };

  useEffect(() => {
    if (isLoggedIn) {
      router.replace(PAGE_NAME.DASHBOARD);
    }

    setIsLoading(false);
  }, [isLoggedIn, router]);

  if (isLoading) return null;

  return isLoggedIn ? null : <SignInForm />;
}

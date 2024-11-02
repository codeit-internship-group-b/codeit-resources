"use client";

import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { useEffect } from "react";
import { useAuthState } from "../_hooks/useAuthState";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const authState = useAuthState();

  const { isLoggedIn } = authState ?? { isLoggedIn: false };

  useEffect(() => {
    if (isLoggedIn) router.replace(PAGE_NAME.DASHBOARD);
  }, [isLoggedIn, router]);

  return isLoggedIn ? null : <SignInForm />;
}

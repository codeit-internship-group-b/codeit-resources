"use client";

import { useRouter } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import { type AuthStore } from "@repo/types";
import { useEffect } from "react";
import { getLocalStorage } from "../_utils/getLocalStorage";
import SignInForm from "./SignInForm";

export default function AuthGuard(): JSX.Element | null {
  const router = useRouter();
  const userStorage = getLocalStorage<AuthStore>("userResponseStore");

  const { isLoggedIn } = userStorage ?? { isLoggedIn: false };

  useEffect(() => {
    if (isLoggedIn) router.replace(PAGE_NAME.DASHBOARD);
  }, [isLoggedIn, router]);

  return isLoggedIn ? null : <SignInForm />;
}

import { useEffect, useState } from "react";
import { type StorageType, type AuthStore } from "@repo/types";
import { getLocalStorage } from "../_utils/getLocalStorage";

export const useAuthState = (): AuthStore | null => {
  const [authState, setAuthState] = useState<AuthStore | null>(null);

  useEffect(() => {
    const userResponseStorage = getLocalStorage<StorageType<AuthStore>>("userResponseStorage");

    setAuthState(userResponseStorage?.state ?? null);
  }, []);

  return authState;
};

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useIsMobileStore from "@/app/store/useIsMobileStore";

export const useRedirectOnMobile = (path: string): void => {
  const isMobile = useIsMobileStore();
  const router = useRouter();

  useEffect(() => {
    if (isMobile) router.replace(path);
  }, [router, isMobile, path]);
};

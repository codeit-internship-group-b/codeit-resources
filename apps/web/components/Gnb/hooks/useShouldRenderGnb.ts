import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";
import useIsMobileStore from "@/app/store/useIsMobileStore";

/**
 * `useShouldRenderGnb`는 `Gnb` 컴포넌트가 특정 조건에 따라 렌더링될지 여부를 결정하는 훅입니다.
 *
 * @returns {boolean} - `true`일 경우 Gnb가 렌더링되고, `false`일 경우 렌더링되지 않습니다.
 *
 * @description
 * - 모바일 환경에서 특정 경로일 경우 Gnb를 렌더링하지 않습니다.
 * - 로그인 페이지에서는 Gnb를 렌더링하지 않습니다.
 */

export const useShouldRenderGnb = (): boolean => {
  const pathname = usePathname();
  const isMobile = useIsMobileStore();
  const [isMobileReady, setIsMobileReady] = useState(false);

  // 모바일에서 컴포넌트가 렌더링되지 않는 페이지
  const hiddenOnMobilePaths = [PAGE_NAME.ADMIN_MEMBERS, PAGE_NAME.ADMIN_TEAMS];
  const isHiddenOnMobile = isMobile && hiddenOnMobilePaths.some((page) => pathname.startsWith(page));

  useEffect(() => {
    setIsMobileReady(true);
  }, []);

  // 모바일에서 특정 페이지일 경우 렌더링하지 않음
  if (!isMobileReady) return false;
  if (isHiddenOnMobile) return false;

  // 로그인페이지 gnb 노출x
  if (pathname === PAGE_NAME.SIGN_IN) return false;

  return true;
};

import { usePathname } from "next/navigation";
import { PAGE_NAME } from "@ui/src/utils/constants/pageNames";

/**
 * `useShouldRenderGnb`는 `Gnb` 컴포넌트가 특정 조건에 따라 렌더링될지 여부를 결정하는 훅입니다.
 *
 * @returns {boolean} - `true`일 경우 Gnb가 렌더링되고, `false`일 경우 렌더링되지 않습니다.
 * @description
 * - 로그인 페이지에서는 Gnb를 렌더링하지 않습니다.
 */

export const useShouldRenderGnb = (): boolean => {
  const pathname = usePathname();

  // 로그인페이지 gnb 노출x
  if (pathname === PAGE_NAME.SIGN_IN) return false;

  return true;
};

"use client";

import { useEffect } from "react";
import useIsMobileStore from "../../app/store/useIsMobileStore";

/**
 * 현재 화면 크기가 모바일인지 주시하는 컴포넌트입니다.
 * 최상단 레이아웃에 박았습니다.
 */

export default function MobileSizeWatcher(): null {
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMediaQueryChange = (e: MediaQueryListEvent): void => {
      useIsMobileStore.setState(e.matches);
    };

    useIsMobileStore.setState(mediaQuery.matches);
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return null;
}

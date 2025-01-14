import { useEffect, useRef } from "react";

interface UseWebViewResult {
  isWebView: boolean;
}

export const useWebView = (): UseWebViewResult => {
  const isWebViewRef = useRef(false);

  useEffect(() => {
    if (isWebViewRef.current) return;

    if (typeof window !== "undefined" && window.ReactNativeWebView) {
      isWebViewRef.current = true;
    }
  }, []);

  return {
    isWebView: isWebViewRef.current,
  };
};

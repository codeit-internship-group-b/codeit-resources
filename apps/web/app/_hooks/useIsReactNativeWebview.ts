import { useState, useEffect } from "react";

export const useIsReactNativeWebview = (): boolean => {
  const [isReactNativeWebview, setIsReactNativeWebview] = useState(false);

  useEffect(() => {
    if (window.ReactNativeWebView) setIsReactNativeWebview(true);
  }, []);

  return isReactNativeWebview;
};

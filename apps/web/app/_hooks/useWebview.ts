import { useState, useEffect } from "react";

export const useWebview = (): boolean => {
  const [isWebview, setIsWebview] = useState(false);

  useEffect(() => {
    if (window.ReactNativeWebView) setIsWebview(true);
  }, []);

  return isWebview;
};

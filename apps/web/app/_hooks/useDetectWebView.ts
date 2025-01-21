import { useEffect, useState } from "react";
import { detectWebView, type WebViewInfo } from "../utils/detectWebView";
import { DEFAULT_WEBVIEW_INFO } from "../constants/devices";

export const useDetectWebView = (): WebViewInfo => {
  const [webViewInfo, setWebViewInfo] = useState<WebViewInfo>(DEFAULT_WEBVIEW_INFO);

  useEffect(() => {
    setWebViewInfo(detectWebView());
  }, []);

  return webViewInfo;
};

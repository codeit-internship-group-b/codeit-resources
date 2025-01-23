import { useEffect, useState } from "react";
import { detectWebView } from "@/lib/bridge/detectWebView";
import { DEFAULT_WEBVIEW_INFO } from "../constants/devices";

interface WebViewInfo {
  isWebView: boolean;
  isIOSWebView: boolean;
  isAndroidWebView: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

export const useDetectWebView = (): WebViewInfo => {
  const [webViewInfo, setWebViewInfo] = useState<WebViewInfo>(DEFAULT_WEBVIEW_INFO);

  useEffect(() => {
    setWebViewInfo(detectWebView());
  }, []);

  return webViewInfo;
};

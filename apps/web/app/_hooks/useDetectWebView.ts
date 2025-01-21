import { useEffect, useState } from "react";
import { DEFAULT_WEBVIEW_INFO } from "../constants/devices";
import { detectDevice } from "../utils/detectDevice";

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
    const userAgent = navigator.userAgent;
    const { isIOS, isAndroid } = detectDevice();

    // IOS 웹뷰 감지
    const isWebKit = userAgent.includes("AppleWebKit");
    const isSafari = userAgent.includes("Safari") || /Version\/[\d.]+.*Safari/.test(userAgent);
    const isNotCriOS = !userAgent.includes("CriOS");
    const isNotFxiOS = !userAgent.includes("FxiOS");

    const isIOSWebView = isIOS && isWebKit && isNotCriOS && isNotFxiOS && !isSafari;

    // Android 웹뷰 감지
    const isAndroidWebView = isAndroid && userAgent.includes("wv");

    setWebViewInfo({
      isWebView: isIOSWebView || isAndroidWebView,
      isIOSWebView,
      isAndroidWebView,
      isIOS,
      isAndroid,
    });
  }, []);

  return webViewInfo;
};

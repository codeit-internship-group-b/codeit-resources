import { useEffect, useState } from "react";

interface UseDetectWebViewResults {
  isWebView: boolean;
  isIOSWebView: boolean;
  isAndroidWebView: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

export const useDetectWebView = (): UseDetectWebViewResults => {
  const [result, setResult] = useState<UseDetectWebViewResults>({
    isWebView: false,
    isIOSWebView: false,
    isAndroidWebView: false,
    isIOS: false,
    isAndroid: false,
  });

  useEffect(() => {
    const userAgent = navigator.userAgent;

    // IOS 웹뷰 감지
    const isIOS = /iPhone|iPad|iPod/.test(userAgent);
    const isWebKit = userAgent.includes("AppleWebKit");
    const isSafari = userAgent.includes("Safari") || /Version\/[\d.]+.*Safari/.test(userAgent);
    const isNotCriOS = !userAgent.includes("CriOS");
    const isNotFxiOS = !userAgent.includes("FxiOS");

    const isIOSWebView = isIOS && isWebKit && isNotCriOS && isNotFxiOS && !isSafari;

    // Android 웹뷰 감지
    const isAndroid = userAgent.includes("Android");
    const isAndroidWebView = isAndroid && userAgent.includes("wv");

    setResult({
      isWebView: isIOSWebView || isAndroidWebView,
      isIOSWebView,
      isAndroidWebView,
      isIOS,
      isAndroid,
    });
  }, []);

  return result;
};

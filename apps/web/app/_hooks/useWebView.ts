interface UseWebViewResult {
  isWebView: boolean;
  isIOSWebView: boolean;
  isAndroidWebView: boolean;
  isIOS: boolean;
  isAndroid: boolean;
}

export const useDetectWebView = (): UseWebViewResult => {
  const userAgent = navigator.userAgent;

  // iOS 웹뷰 감지
  const isIOS = /iPhone|iPad|iPod/.test(userAgent);
  const isWebKit = userAgent.includes("AppleWebKit");
  const isSafari = userAgent.includes("Safari") || /Version\/[\d.]+.*Safari/.test(userAgent);
  const isNotCriOS = !userAgent.includes("CriOS");
  const isNotFxiOS = !userAgent.includes("FxiOS");

  const isIOSWebView = isIOS && isWebKit && isNotCriOS && isNotFxiOS && !isSafari;

  // Android 웹뷰 감지
  const isAndroid = userAgent.includes("Android");
  const isAndroidWebView = isAndroid && userAgent.includes("wv");

  return {
    isWebView: isIOSWebView || isAndroidWebView,
    isIOSWebView,
    isAndroidWebView,
    isIOS,
    isAndroid,
  };
};

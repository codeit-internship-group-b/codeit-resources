"use client";

type WebViewEventListener = (messageHandler: (event: Event) => void) => void;

export const createWebViewEventListener = ({
  isIOSWebView,
  isAndroidWebView,
}: {
  isIOSWebView: boolean;
  isAndroidWebView: boolean;
}): WebViewEventListener => {
  return (messageHandler) => {
    if (isIOSWebView) {
      window.addEventListener("message", messageHandler);
    } else if (isAndroidWebView) {
      document.addEventListener("message", messageHandler);
    }
  };
};

import { DEFAULT_WEBVIEW_INFO } from "../constants/devices";
import { detectDevice, type DeviceInfo } from "./detectDevice";

export interface WebViewInfo extends DeviceInfo {
  isWebView: boolean;
  isIOSWebView: boolean;
  isAndroidWebView: boolean;
}

export const detectWebView = (): WebViewInfo => {
  if (typeof window === "undefined") {
    return DEFAULT_WEBVIEW_INFO;
  }

  const { isIOS, isAndroid } = detectDevice();
  const userAgent = navigator.userAgent;

  const isIOSWebView =
    isIOS &&
    userAgent.includes("AppleWebKit") &&
    !userAgent.includes("Safari") &&
    !userAgent.includes("CriOS") &&
    !userAgent.includes("FxiOS");

  const isAndroidWebView = isAndroid && userAgent.includes("wv");

  return {
    isWebView: isIOSWebView || isAndroidWebView,
    isIOSWebView,
    isAndroidWebView,
    isIOS,
    isAndroid,
  };
};

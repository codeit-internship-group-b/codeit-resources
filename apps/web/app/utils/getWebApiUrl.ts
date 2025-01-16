import { isAndroid, isIOS } from "react-device-detect";

export const getWebApiUrl = (): string | undefined => {
  const isWebView = typeof window !== "undefined" && Boolean(window.ReactNativeWebView);

  if (isWebView) {
    if (isAndroid) return process.env.NEXT_PUBLIC_ANDROID_API_URL;
    if (isIOS) return process.env.NEXT_PUBLIC_IOS_API_URL;
  }

  return process.env.NEXT_PUBLIC_API_URL;
};

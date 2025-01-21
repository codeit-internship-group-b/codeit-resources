import { detectDevice } from "../app/utils/detectDevice";

export const getWebApiUrl = (): string | undefined => {
  if (typeof window === "undefined") {
    return process.env.NEXT_PUBLIC_API_URL;
  }

  const isWebView = window.ReactNativeWebView;
  const { isAndroid, isIOS } = detectDevice();

  if (isWebView) {
    if (isAndroid) return process.env.NEXT_PUBLIC_ANDROID_API_URL;
    if (isIOS) return process.env.NEXT_PUBLIC_IOS_API_URL;
  }

  return process.env.NEXT_PUBLIC_API_URL;
};

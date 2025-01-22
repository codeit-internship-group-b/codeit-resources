import { detectWebView } from "@/lib/bridge/detectWebView";

export const getWebApiUrl = (): string | undefined => {
  const { isAndroid, isIOS } = detectWebView();

  if (isAndroid) return process.env.NEXT_PUBLIC_ANDROID_API_URL;
  if (isIOS) return process.env.NEXT_PUBLIC_IOS_API_URL;

  return process.env.NEXT_PUBLIC_API_URL;
};

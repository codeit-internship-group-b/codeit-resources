import { type WebviewMessageType } from "@ui/src/types/WebviewMessageTypes";
import { useIsReactNativeWebview } from "./useIsReactNativeWebview";

export interface WebViewMessage<T> {
  type: WebviewMessageType;
  data: T | null;
}

export const usePostMessageToRN = () => {
  const isReactNativeWebview = useIsReactNativeWebview();

  return <T>(message: WebViewMessage<T>) => {
    if (isReactNativeWebview) {
      window.ReactNativeWebView.postMessage(JSON.stringify(message));
    }
  };
};

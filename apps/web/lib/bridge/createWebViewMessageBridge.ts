/* eslint-disable @typescript-eslint/no-empty-function */
import type { Message } from "@repo/ui/src/types/WebViewMessageTypes";
import { stringifyJson } from "@repo/ui/src/utils/stringifyJson";
import { detectDevice } from "../../app/utils/detectDevice";

interface WebViewMessageBridge {
  addMessageListener: (messageHandler: (event: Event) => void) => void;
  sendMessageToWebView: <T>(message: Message<T>) => void;
}

export const createWebViewMessageBridge = (): WebViewMessageBridge => {
  if (typeof window === "undefined" || !window.ReactNativeWebView) {
    return {
      addMessageListener: () => {},
      sendMessageToWebView: () => {},
    };
  }

  const { isAndroid, isIOS } = detectDevice();

  return {
    addMessageListener: (messageHandler) => {
      if (isIOS) {
        window.addEventListener("message", messageHandler);
      } else if (isAndroid) {
        document.addEventListener("message", messageHandler);
      }
    },
    sendMessageToWebView: <T>({ type, data }: Message<T>): void => {
      window.ReactNativeWebView?.postMessage(stringifyJson({ type, data }));
    },
  };
};

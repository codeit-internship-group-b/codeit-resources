import { stringifyJson } from "@repo/ui/src/utils/stringifyJson";

interface Message<T> {
  type: string;
  data: T | null;
}

export const sendMessageToWebView = <T>({ type, data }: Message<T>): void => {
  window.ReactNativeWebView?.postMessage(stringifyJson({ type, data }));
};

import { stringifyJson } from "@repo/ui/src/utils/stringifyJson";
import { Message } from "@ui/src/types/WebviewMessageTypes";
import { RefObject } from "react";
import WebView from "react-native-webview";

export interface SendMessage<T> extends Message<T> {
  webViewRef: RefObject<WebView<object>>;
}

export const sendMessageToWeb = <T>({ webViewRef, type, data }: SendMessage<T>) => {
  if (webViewRef.current) {
    webViewRef.current.postMessage(stringifyJson({ type, data }));
  }
};

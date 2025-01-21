import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { RefObject } from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";
import { WebViewProgressEvent } from "react-native-webview/lib/WebViewTypes";

import { getAuthData } from "@/store/authStorage";

import { sendMessageToWeb } from "./sendMessageToWeb";

interface WebviewLoadHandler {
  event: "onLoadProgress" | "onLoad";
  handler: (e: WebViewProgressEvent) => void;
}

const sendAuthData = async (webViewRef: RefObject<WebView<object>>) => {
  const authData = await getAuthData();
  sendMessageToWeb({
    webViewRef,
    type: WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN,
    data: authData,
  });
};

export const webViewLoadHandler = (webViewRef: RefObject<WebView<object>>): WebviewLoadHandler => {
  if (Platform.OS === "ios") {
    return {
      event: "onLoadProgress",
      handler: (e: WebViewProgressEvent) => {
        const progress = e.nativeEvent.progress;

        if (progress === 1) {
          sendAuthData(webViewRef);
        }
      },
    };
  }

  return {
    event: "onLoad",
    handler: () => sendAuthData(webViewRef),
  };
};

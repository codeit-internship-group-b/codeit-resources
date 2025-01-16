import AsyncStorage from "@react-native-async-storage/async-storage";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { RefObject } from "react";
import { Platform } from "react-native";
import WebView from "react-native-webview";
import { WebViewProgressEvent, WebViewMessageEvent } from "react-native-webview/lib/WebViewTypes";

import webviewLoginBridge from "@/utils/webviewLoginBridge";

import { parseMessage } from "./parseMessage";
import { sendMessageToWeb } from "./sendMessageToWeb";

const isIos = Platform.OS === "ios";
const isAndroid = Platform.OS === "android";

const sendData = async (webViewRef: RefObject<WebView<object>>) => {
  const accessToken = await AsyncStorage.getItem("accessToken");
  const userStr = await AsyncStorage.getItem("user");

  const sendMessageData = {
    webViewRef,
    type: WEBVIEW_MESSAGE_TYPES.AUTO_LOGIN,
    data: {
      accessToken,
      user: userStr ? JSON.parse(userStr) : null,
    },
  };

  sendMessageToWeb(sendMessageData);
};

// IOS
export const handleLoadProgressCurried = (webViewRef: RefObject<WebView<object>>) => (e: WebViewProgressEvent) => {
  const progress = e.nativeEvent.progress;

  if (progress === 1) {
    isIos && sendData(webViewRef);
  }
};

// ANDROID
export const handleLoadCurried = (webViewRef: RefObject<WebView<object>>) => () => {
  isAndroid && sendData(webViewRef);
};

export const handleReceiveMessage = (e: WebViewMessageEvent) => {
  const { type, data } = parseMessage(e);
  const handler = webviewLoginBridge.get(type);

  if (handler) {
    handler(data);
  }
};

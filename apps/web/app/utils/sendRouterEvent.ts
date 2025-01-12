import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";

interface SendRouterEventParams {
  path: string;
}

export const sendRouterEvent = (params: SendRouterEventParams): void => {
  if (typeof window !== "undefined" && window.ReactNativeWebView)
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT, ...params }));
};

interface SendRouterEventParams {
  path: string;
}

export const sendRouterEvent = (params: SendRouterEventParams): void => {
  if (typeof window !== "undefined" && window.ReactNativeWebView)
    window.ReactNativeWebView.postMessage(JSON.stringify({ type: "ROUTER_EVENT", ...params }));
};

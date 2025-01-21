import { useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { handleAuthStorage } from "@/store/authStorage";
import { getWebViewApiUrl } from "@/utils/getWebViewApiUrl";
import { parseMessage } from "@/utils/parseMessage";
import { webViewLoadHandler } from "@/utils/webViewLoadHandler";

export default function HomeScreen() {
  const webviewRef = useRef<WebView>(null);

  const baseUrl = getWebViewApiUrl();
  const handleNavigationActions = useHandleNavigationActions();
  const { event, handler } = webViewLoadHandler(webviewRef);

  const handleMessage = (e: WebViewMessageEvent) => {
    handleNavigationActions(e);

    const { type, data } = parseMessage(e);
    handleAuthStorage(type, data);
  };

  return (
    <WebView
      ref={webviewRef}
      source={{ uri: `${baseUrl}` }}
      onMessage={handleMessage}
      {...{ [event]: handler }}
      className="flex-1"
      cacheEnabled
      javaScriptEnabled
      domStorageEnabled
    />
  );
}

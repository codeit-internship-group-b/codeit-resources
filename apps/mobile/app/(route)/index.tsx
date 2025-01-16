import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { useRef } from "react";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { handleReceiveMessage, handleLoadProgressCurried, handleLoadCurried } from "@/utils/bridgeHandler";
import { getNativeApiUrl } from "@/utils/getNativeApiUrl";
import { parseMessage } from "@/utils/parseMessage";

export default function HomeScreen() {
  const webviewRef = useRef<WebView>(null);

  const baseUrl = getNativeApiUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const handleWebviewMessage = (e: WebViewMessageEvent) => {
    const { type } = parseMessage(e);

    if (type === WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT) {
      handleNavigationActions(e);
    } else {
      handleReceiveMessage(e);
    }
  };

  return (
    <WebView
      ref={webviewRef}
      className="flex-1"
      source={{ uri: `${baseUrl}` }}
      onMessage={handleWebviewMessage}
      onLoadProgress={handleLoadProgressCurried(webviewRef)}
      onLoad={handleLoadCurried(webviewRef)}
      cacheEnabled
      javaScriptEnabled
      domStorageEnabled
    />
  );
}

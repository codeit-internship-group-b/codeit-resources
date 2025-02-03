import WebView, { WebViewMessageEvent } from "react-native-webview";

import { ROUTES } from "@/constants/routes";
import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { getWebViewApiUrl } from "@/utils/getWebViewApiUrl";
import { parseMessage } from "@/utils/parseMessage";

export default function DashboardScreen() {
  const baseUrl = getWebViewApiUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const { type, data } = parseMessage(e);

    handleNavigationActions({ type, data });
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.DASHBOARD}` }} onMessage={requestOnMessage} />;
}

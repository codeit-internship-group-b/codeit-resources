import WebView, { WebViewMessageEvent } from "react-native-webview";

import { ROUTES } from "@/constants/routes";
import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { getWebViewApiUrl } from "@/utils/getWebViewApiUrl";

export default function SeatsScreen() {
  const baseUrl = getWebViewApiUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    handleNavigationActions(e);
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.SEATS}` }} onMessage={requestOnMessage} />;
}

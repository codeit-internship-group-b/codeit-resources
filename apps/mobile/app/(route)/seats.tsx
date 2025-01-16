import WebView, { WebViewMessageEvent } from "react-native-webview";

import { ROUTES } from "@/constants/routes";
import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { getNativeApiUrl } from "@/utils/getNativeApiUrl";

export default function SeatsScreen() {
  const baseUrl = getNativeApiUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    handleNavigationActions(e);
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.SEATS}` }} onMessage={requestOnMessage} />;
}

import WebView, { WebViewMessageEvent } from "react-native-webview";

import { ROUTES } from "@/constants/routes";
import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { getNativeApiUrl } from "@/utils/getNativeApiUrl";

export default function DashboardScreen() {
  const baseUrl = getNativeApiUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    handleNavigationActions(e);
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.DASHBOARD}` }} onMessage={requestOnMessage} />;
}

import WebView, { WebViewMessageEvent } from "react-native-webview";
import { ROUTES } from "@/constants/routes";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";

export default function SeatsScreen() {
  const baseUrl = getBaseUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    handleNavigationActions(e);
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.SEATS}` }} onMessage={requestOnMessage} />;
}

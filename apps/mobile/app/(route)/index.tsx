import { WebView, WebViewMessageEvent } from "react-native-webview";

import { useHandleNavigationActions } from "@/hooks/useHandleNavigationActions";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function HomeScreen() {
  // TODO : login상태에 따른 분기 처리 설정

  const baseUrl = getBaseUrl();
  const handleNavigationActions = useHandleNavigationActions();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    handleNavigationActions(e);
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}` }} onMessage={requestOnMessage} />;
}

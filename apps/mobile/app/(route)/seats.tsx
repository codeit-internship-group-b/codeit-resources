import { StackActions } from "@react-navigation/native";
import { useNavigation, usePathname } from "expo-router";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import { DIR_NAME, ROUTES } from "@/constants/routes";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function SeatsScreen() {
  const baseUrl = getBaseUrl();
  const navigation = useNavigation();
  const pathname = usePathname();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    if (nativeEvent.type === "ROUTER_EVENT") {
      const { path } = nativeEvent;
      const pushAction = StackActions.push(`${DIR_NAME}${path}`, { url: path, isStack: true });

      console.log(path);
      if (pathname === path) return;
      navigation.dispatch(pushAction);
    }
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.SEATS}` }} onMessage={requestOnMessage} />;
}

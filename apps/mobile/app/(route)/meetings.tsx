import { StackActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import { DIR_NAME, ROUTES } from "@/constants/routes";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function MeetingsScreen() {
  const baseUrl = getBaseUrl();
  const navigation = useNavigation();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    if (nativeEvent.type === "ROUTER_EVENT") {
      const { path } = nativeEvent;
      const pushAction = StackActions.push(`${DIR_NAME}${path}`, { url: path, isStack: true });
      navigation.dispatch(pushAction);
    }
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}${ROUTES.MEETINGS}` }} onMessage={requestOnMessage} />;
}

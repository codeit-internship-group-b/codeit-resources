import { StackActions } from "@react-navigation/native";
import { useNavigation, usePathname } from "expo-router";
import { WebView, WebViewMessageEvent } from "react-native-webview";

import { DIR_NAME } from "@/constants/routes";
import { getBaseUrl } from "@/utils/getBaseUrl";

export default function HomeScreen() {
  // TODO : login상태에 따른 분기 처리 설정

  const baseUrl = getBaseUrl();
  const navigation = useNavigation();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    if (nativeEvent.type === "ROUTER_EVENT") {
      const { path } = nativeEvent;
      const pushAction = StackActions.push(`${DIR_NAME}${path}`, { url: path, isStack: true });

      console.log(path);
      navigation.dispatch(pushAction);
    }
  };

  return <WebView className="flex-1" source={{ uri: `${baseUrl}` }} onMessage={requestOnMessage} />;
}

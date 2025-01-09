import { ROUTES } from "@/constants/routes";
import { StackActions } from "@react-navigation/native";
import { Link, useNavigation } from "expo-router";
import { View } from "react-native";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function HomeScreen() {
  const { dispatch } = useNavigation();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    if (nativeEvent.type === "ROUTER_EVENT") {
      const { path } = nativeEvent;
      const pushAction = StackActions.push("(route)/settings", { url: path, isStack: true });
      dispatch(pushAction);
    }
  };

  return (
    <View>
      <Link href={{ pathname: ROUTES.DASHBOARD }}>하이</Link>
      <WebView
        className="flex-1"
        source={{ uri: "http://10.0.2.2:3000" }}
        onMessage={requestOnMessage}
        javaScriptEnabled
        domStorageEnabled
      />
    </View>
  );
}

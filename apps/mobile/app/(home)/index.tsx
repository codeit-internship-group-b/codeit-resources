import { useRouter } from "expo-router";
import { WebView, WebViewMessageEvent } from "react-native-webview";

export default function HomeScreen() {
  const router = useRouter();

  const requestOnMessage = (e: WebViewMessageEvent) => {
    const nativeEvent = JSON.parse(e.nativeEvent.data);

    if (nativeEvent.type === "ROUTER.EVENT") {
      const { path } = nativeEvent;
      router.push(path);
    }
  };

  return <WebView className="flex-1" source={{ uri: "https://codeit.click" }} onMessage={requestOnMessage} />;
}

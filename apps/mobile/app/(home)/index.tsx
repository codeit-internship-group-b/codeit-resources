import { WebView } from "react-native-webview";

export default function HomeScreen() {
  return <WebView className="flex-1" source={{ uri: "https://codeit.click" }} />;
}

import WebView from "react-native-webview";

export default function SeatsScreen() {
  return <WebView className="flex-1" source={{ uri: "http://10.0.2.2:3000/seats" }} />;
}

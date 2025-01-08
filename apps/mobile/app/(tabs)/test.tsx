import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { messageHandler } from "@/utils/messageHandler";

export default function Test() {
  const devServerUrl = "http://10.0.2.2:3000" as string;

  return (
    <WebView
      style={styles.container}
      source={{ uri: devServerUrl }}
      onMessage={({ nativeEvent }) => {
        const { type, data } = JSON.parse(nativeEvent.data);
        const handler = messageHandler.get(type);
        if (handler) {
          handler(data);
        }
      }}
      javaScriptEnabled
      domStorageEnabled
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

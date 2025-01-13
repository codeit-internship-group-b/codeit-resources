import Constants from "expo-constants";
import { useRef } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import { handleReceiveMessage, handleLoadProgressCurried, handleLoadCurried } from "@/utils/bridgeHandler";

export default function Test() {
  const webviewRef = useRef<WebView>(null);
  const hostUrl = process.env.EXPO_PUBLIC_API_URL_ANDROID as string;

  return (
    <WebView
      source={{ uri: hostUrl }}
      onMessage={handleReceiveMessage}
      onLoadProgress={handleLoadProgressCurried(webviewRef)}
      onLoad={handleLoadCurried(webviewRef)}
      style={styles.container}
      cacheEnabled
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

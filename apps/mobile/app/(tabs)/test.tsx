import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useEffect, useRef } from "react";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

import webviewLoginBridge from "@/utils/webviewLoginBridge";

export default function Test() {
  const webveiwRef = useRef<WebView>(null);
  const hostUrl = process.env.EXPO_PUBLIC_API_URL as string;

  const postMessageToWeb = async () => {
    const accessToken = await AsyncStorage.getItem("accessToken");
    const userStr = await AsyncStorage.getItem("user");

    if (accessToken && userStr) {
      webveiwRef.current?.postMessage(
        JSON.stringify({
          type: "AUTO_LOGIN",
          data: {
            accessToken,
            user: JSON.parse(userStr),
          },
        }),
      );
    }
  };

  useEffect(() => {
    postMessageToWeb();
  }, []);

  return (
    <WebView
      ref={webveiwRef}
      style={styles.container}
      source={{ uri: hostUrl }}
      onMessage={({ nativeEvent }) => {
        const { type, data } = JSON.parse(nativeEvent.data);
        const handler = webviewLoginBridge.get(type);
        if (handler) {
          handler(data);
        }
      }}
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

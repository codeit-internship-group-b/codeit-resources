import Constants from "expo-constants";
import { StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

export default function test() {
  return <WebView style={styles.container} source={{ uri: "https://codeit.click" }} />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
});

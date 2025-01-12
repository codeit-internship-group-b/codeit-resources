import { DIR_NAME } from "@/constants/routes";
import { parseMessageEvent } from "@/utils/parseMessageEvent";
import { StackActions } from "@react-navigation/native";
import { useNavigation, usePathname } from "expo-router";
import { WebViewMessageEvent } from "react-native-webview";

export const useHandleNavigationActions = () => {
  const pathname = usePathname();
  const navigation = useNavigation();

  const handleNavigationActions = (e: WebViewMessageEvent) => {
    const parsedMessage = parseMessageEvent(e);
    if (!parsedMessage || parsedMessage.type !== "ROUTER_EVENT") return;

    const { path } = parsedMessage;
    if (pathname === path) return;

    const action =
      path === "back" ? StackActions.pop(1) : StackActions.push(`${DIR_NAME}${path}`, { url: path, isStack: true });

    navigation.dispatch(action);
  };

  return handleNavigationActions;
};

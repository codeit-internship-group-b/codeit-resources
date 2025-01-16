import { StackActions } from "@react-navigation/native";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { useNavigation, usePathname } from "expo-router";
import { WebViewMessageEvent } from "react-native-webview";

import { DIR_NAME } from "@/constants/routes";
import { parseMessage } from "@/utils/parseMessage";

export const useHandleNavigationActions = () => {
  const pathname = usePathname();
  const navigation = useNavigation();

  const handleNavigationActions = (e: WebViewMessageEvent) => {
    const parsedMessage = parseMessage(e);
    if (!parsedMessage || parsedMessage.type !== WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT) return;

    const { data: path } = parsedMessage;
    if (pathname === path) return;

    const action = path === "back" ? StackActions.pop(1) : StackActions.push(`${DIR_NAME}${path}`);

    navigation.dispatch(action);
  };

  return handleNavigationActions;
};

import { StackActions } from "@react-navigation/native";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { Message } from "@ui/src/types/WebViewMessageTypes";
import { useNavigation, usePathname } from "expo-router";

import { DIR_NAME } from "@/constants/routes";

export const useHandleNavigationActions = () => {
  const pathname = usePathname();
  const navigation = useNavigation();

  const handleNavigationActions = ({ type, data }: Message<string>) => {
    if (type !== WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT) return;

    const path = data;

    if (pathname === path) return;

    const action = path === "back" ? StackActions.pop(1) : StackActions.push(`${DIR_NAME}${path}`);

    navigation.dispatch(action);
  };

  return handleNavigationActions;
};

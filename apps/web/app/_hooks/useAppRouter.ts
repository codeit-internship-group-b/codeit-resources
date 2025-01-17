import { useRouter } from "next/navigation";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { sendMessageToNative } from "../utils/sendMessageToNative";
import { useDetectWebView } from "./useWebView";

interface UseAppRouterResult {
  push: (url: string) => void;
}

export const useAppRouter = (): UseAppRouterResult => {
  const { isWebView } = useDetectWebView();
  const router = useRouter();

  const push = (url: string): void => {
    if (isWebView) {
      sendMessageToNative({
        type: WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT,
        data: url,
      });
      return;
    }

    router.push(url);
  };

  return { push };
};

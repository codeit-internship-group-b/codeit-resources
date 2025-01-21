import { useRouter } from "next/navigation";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { sendMessageToWebView } from "../../lib/bridge/sendMessageToWebView";
import { useDetectWebView } from "./useDetectWebView";

interface UseAppRouterResult {
  push: (url: string) => void;
}

export const useAppRouter = (): UseAppRouterResult => {
  const { isWebView } = useDetectWebView();
  const router = useRouter();

  const push = (url: string): void => {
    if (isWebView) {
      sendMessageToWebView({
        type: WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT,
        data: url,
      });
      return;
    }

    router.push(url);
  };

  return { push };
};

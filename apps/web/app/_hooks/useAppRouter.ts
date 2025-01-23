import { useRouter } from "next/navigation";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { sendMessageToWebView } from "@/lib/bridge/sendMessageToWebView";
import { useDetectWebView } from "./useDetectWebView";

interface UseAppRouterResult {
  push: (url: string) => void;
}

export const useAppRouter = (): UseAppRouterResult => {
  const router = useRouter();
  const { isWebView } = useDetectWebView();

  const push = (url: string): void => {
    // web view 실행
    if (isWebView) {
      sendMessageToWebView({
        type: WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT,
        data: url,
      });
    }

    // web 실행
    router.push(url);
  };

  return { push };
};

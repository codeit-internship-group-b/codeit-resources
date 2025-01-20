import { useRouter } from "next/navigation";
import { WEBVIEW_MESSAGE_TYPES } from "@repo/constants";
import { sendMessageToNative } from "../utils/sendMessageToNative";
import { useDetectWebView } from "./useDetectWebView";

interface UseAppRouterResult {
  push: (url: string) => void;
}

export const useAppRouter = (): UseAppRouterResult => {
  const { isWebView } = useDetectWebView();
  const router = useRouter();

  const push = (url: string): void => {
    // web view 실행
    if (isWebView) {
      sendMessageToNative({
        type: WEBVIEW_MESSAGE_TYPES.ROUTER_EVENT,
        data: url,
      });
      return;
    }

    // web 실행
    router.push(url);
  };

  return { push };
};

import { useRouter } from "next/navigation";
import { sendRouterEvent } from "../utils/sendRouterEvent";
import { useWebView } from "./useWebView";

interface UseAppRouterResult {
  push: (url: string) => void;
}

export const useAppRouter = (): UseAppRouterResult => {
  const { isWebView } = useWebView();
  const router = useRouter();

  const push = (url: string): void => {
    if (isWebView) {
      sendRouterEvent({
        path: url,
      });
      return;
    }

    router.push(url);
  };

  return { push };
};

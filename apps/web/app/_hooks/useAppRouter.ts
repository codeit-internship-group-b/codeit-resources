import { useRouter } from "next/router";
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
        path: `${process.env.NEXT_PUBLIC_BASE_URL}${url}`,
      });
      return;
    }

    void router.push(url);
  };

  return { push };
};

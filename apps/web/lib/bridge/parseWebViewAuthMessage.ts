import type { Message, LoginData } from "@repo/ui/src/types/WebViewMessageTypes";
import { updateWebViewAuthStore } from "../../app/store/updateWebViewAuthStore";

export const parseWebViewAuthMessage = (event: Event): void => {
  const { type, data } = JSON.parse((event as MessageEvent<string>).data) as Message<LoginData>;

  updateWebViewAuthStore(type, data);
};

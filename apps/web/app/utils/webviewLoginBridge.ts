import { useRouter } from "next/navigation";
import axios from "axios";
import { type SignInResponseType } from "@repo/types";
import { API_ENDPOINTS } from "@repo/constants";
import type { WebviewMessageType, WebviewLoginMessageHandler } from "@ui/src/types/WebviewMessageTypes";
import { useAuthStore } from "../store/useAuthStore";

const webviewLoginBridge = new Map<WebviewMessageType, WebviewLoginMessageHandler>();

const isWebView = typeof window !== "undefined" && window.ReactNativeWebView;
const API_URL = isWebView ? process.env.NEXT_PUBLIC_ANDROID_API_URL : process.env.NEXT_PUBLIC_API_URL;

const validateToken = async (payload: string): Promise<boolean> => {
  const response = await axios.post<SignInResponseType>(`${API_URL}${API_ENDPOINTS.AUTH.SIGN_IN}`, payload, {
    headers: {
      "Content-Typet": "application/json",
    },
  });

  return response.status === 200;
};

webviewLoginBridge.set("AUTO_LOGIN", async (data) => {
  const router = useRouter();
  const { login } = useAuthStore();
  const { user, accessToken } = data;

  const isValidToken = await validateToken(accessToken);

  if (isValidToken) {
    login(user, accessToken);
    router.push("/dashboard");
  }
});

export default webviewLoginBridge;

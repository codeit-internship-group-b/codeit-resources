interface Message<T> {
  type: string;
  data: T | null;
}

export const sendMessageToNative = <T>({ type, data }: Message<T>): void => {
  if (typeof window !== "undefined" && window.ReactNativeWebView) {
    window.ReactNativeWebView.postMessage(JSON.stringify({ type, data }));
  }
};

declare global {
  interface Window {
    ReactNativeWebView: {
      postMessage: (value: string) => void;
      platform: "ios" | "android";
    };
  }
}

export {};

export const DEFAULT_DEVICE_INFO = {
  isIOS: false,
  isAndroid: false,
} as const;

export const DEFAULT_WEBVIEW_INFO = {
  ...DEFAULT_DEVICE_INFO,
  isWebView: false,
  isIOSWebView: false,
  isAndroidWebView: false,
} as const;

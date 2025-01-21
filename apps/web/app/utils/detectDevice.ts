import { DEFAULT_DEVICE_INFO } from "../constants/devices";

export interface DeviceInfo {
  isIOS: boolean;
  isAndroid: boolean;
}

export const detectDevice = (): DeviceInfo => {
  if (typeof window === "undefined") {
    return DEFAULT_DEVICE_INFO;
  }

  const userAgent = navigator.userAgent;

  return {
    isIOS: /iPhone|iPad|iPod/.test(userAgent),
    isAndroid: userAgent.includes("Android"),
  };
};

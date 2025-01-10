import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

const isWebView = typeof window !== "undefined" && window.ReactNativeWebView;
const API_URL = isWebView ? process.env.NEXT_PUBLIC_ANDROID_API_URL : process.env.NEXT_PUBLIC_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10_000,
});

interface AxiosRequesterParams<T> {
  options: AxiosRequestConfig<T>;
}

type AxiosRequester = <K, T = unknown>(params: AxiosRequesterParams<T>) => Promise<AxiosResponse<K>>;

export const axiosRequester: AxiosRequester = async ({ options }) => {
  const accessToken = getCookie("accessToken");
  const headers = accessToken ? { ...options.headers, Authorization: `Bearer ${accessToken}` } : options.headers;

  return axiosInstance({
    ...options,
    headers,
  });
};

import axios, { type AxiosRequestConfig, type AxiosResponse } from "axios";
import { getCookie } from "cookies-next";
import { getWebApiUrl } from "@/api/getWebApiUrl";

const baseURL = getWebApiUrl();

export const axiosInstance = axios.create({
  baseURL,
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

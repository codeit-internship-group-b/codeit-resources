import axios, { type AxiosRequestConfig, type AxiosRequestHeaders, type AxiosResponse } from "axios";
import { getCookie } from "cookies-next";

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 10_000,
  headers: {
    "Content-Type": "application/json",
  },
});

interface AxiosRequesterParams<T> {
  options: AxiosRequestConfig<T>;
}

type AxiosRequester = <K, T = unknown>(params: AxiosRequesterParams<T>) => Promise<AxiosResponse<K>>;

export const axiosRequester: AxiosRequester = async ({ options }) => {
  const headers = {
    ...options.headers,
    "Content-Type": "application/json",
  } as AxiosRequestHeaders;
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const client = await axiosInstance({
    ...options,
    headers,
  });

  return client;
};

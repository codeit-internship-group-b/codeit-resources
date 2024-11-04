import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosRequestHeaders } from "axios";
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

type AxiosRequester = <T>(params: AxiosRequesterParams<T>) => Promise<AxiosResponse<T>>;

export const axiosRequester: AxiosRequester = async ({ options }) => {
  const headers = { ...options.headers } as AxiosRequestHeaders;
  const accessToken = getCookie("accessToken");

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const client = await axiosInstance({ ...options, headers });

  return client;
};

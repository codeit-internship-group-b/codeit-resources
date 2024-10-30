import axios, { type AxiosRequestConfig, type AxiosResponse, type AxiosRequestHeaders } from "axios";

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

  // TODO: access token을 localStorage 또는 cookie에서 가져오는 로직
  const accessToken = document.cookie
    .split("; ")
    .find((row) => {
      return row.startsWith("accessToken=");
    })
    ?.split("=")[1];

  if (accessToken) {
    headers.Authorization = `Bearer ${accessToken}`;
  }

  const client = await axiosInstance({ ...options, headers });

  return client;
};

import axios, { type AxiosError } from "axios";
import { type ResponseWithMessage } from "@repo/types/src/membersType";
import { notifyMutationError } from "@/app/utils/notifyMutationError";
import { axiosInstance } from "./axios";

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: Error | AxiosError<ResponseWithMessage>) => {
    if (axios.isAxiosError(error)) {
      notifyMutationError(error);
    }

    return Promise.reject(error);
  },
);

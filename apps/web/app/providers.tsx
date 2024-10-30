"use client";

import { isServer, QueryClient, QueryClientProvider, QueryCache, MutationCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";
import { Toast } from "@ui/index";
import notify from "@repo/ui/src/components/common/Toast/notify";
import MobileSizeWatcher from "@/components/MobileSizeWatcher";

interface ProvidersProps {
  children: ReactNode;
}

interface ErrorResponse {
  response?: {
    data?: {
      message?: string;
    };
    status?: number;
  };
  message?: string;
}

function getErrorMessage(error: ErrorResponse): string {
  // 서버에서 보낸 에러 메시지
  if (error.response?.data?.message) {
    return error.response.data.message;
  }

  // 기본 에러 메시지
  return error.message ?? "요청 처리 중 오류가 발생했습니다.";
}

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
    queryCache: new QueryCache({
      onError: (error: ErrorResponse) => {
        notify({
          type: "error",
          message: getErrorMessage(error),
        });
      },
    }),
    mutationCache: new MutationCache({
      onError: (error: ErrorResponse) => {
        notify({
          type: "error",
          message: getErrorMessage(error),
        });
      },
    }),
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient(): QueryClient {
  if (isServer) {
    return makeQueryClient();
  }
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function Providers({ children }: ProvidersProps): JSX.Element {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <MobileSizeWatcher />
      <ReactQueryDevtools initialIsOpen={false} />
      <Toast />
    </QueryClientProvider>
  );
}

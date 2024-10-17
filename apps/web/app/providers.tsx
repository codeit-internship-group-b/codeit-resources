"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Label } from "@ui/index";
import { type ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

function makeQueryClient(): QueryClient {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
      },
    },
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
    <>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
      <Label color="purple" shape="round" colorApplyTo="font">
        폰트 색상 적용
      </Label>
      <Label color="green" shape="round" colorApplyTo="background">
        배경 색상 적용
      </Label>
      <Label color="pink" shape="square" colorApplyTo="background">
        배경 색상 적용
      </Label>
      <Label color="pink" shape="round" colorApplyTo="font">
        배경 색상 적용
      </Label>
      <Label color="yellow" shape="round" colorApplyTo="background">
        배경 색상 적용
      </Label>
      <Label color="gray" shape="square" colorApplyTo="background">
        배경 색상 적용
      </Label>
      <Label color="blue" shape="square" colorApplyTo="background">
        배경 색상 적용
      </Label>
    </>
  );
}

"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type ReactNode } from "react";
import { Modal } from "@ui/index";

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
    <QueryClientProvider client={queryClient}>
      {children}
      <Modal.Root>
        <Modal.Trigger>modal trigger</Modal.Trigger>
        <Modal.Content>
          <Modal.Title>제목</Modal.Title>
          <Modal.Description>
            기존의 자리는 취소되며,
            <br /> 선택한 자리가 예약됩니다.
          </Modal.Description>
          <Modal.Close
            onConfirm={() => {
              console.log("Button Clicked!");
            }}
            confirmText="이동하기"
            cancelText="취소하기"
          >
            예
          </Modal.Close>
        </Modal.Content>
      </Modal.Root>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

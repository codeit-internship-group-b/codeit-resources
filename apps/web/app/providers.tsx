"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { type PropsWithChildren } from "react";
import MobileSizeWatcher from "@/components/MobileSizeWatcher";
import { getQueryClient } from "@/lib/queryClient";
import Toast from "@/components/common/Toast";
import "@/lib/axiosInterceptor";

export default function Providers({ children }: PropsWithChildren): JSX.Element {
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

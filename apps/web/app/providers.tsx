"use client";

import { isServer, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Radio } from "@ui/index";
import { useState, type ReactNode } from "react";

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
  const [selectedOption, setSelectedOption] = useState<string>("option1");

  const handleSelectionChange = (value: string): void => {
    setSelectedOption(value);
  };

  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      <ReactQueryDevtools initialIsOpen={false} />
      <div className="p-4">
        <h1 className="mb-4 text-xl">Radio Button 컴포넌트 예시</h1>
        <Radio.Group defaultValue="option1" onChange={handleSelectionChange}>
          <div className="space-y-4">
            <Radio.Option value="option1" description="옵션 1의 상세 설명입니다.">
              옵션 1
            </Radio.Option>
            <Radio.Option value="option2" description="옵션 2의 상세 설명입니다." disabled>
              옵션 2 (비활성화)
            </Radio.Option>
            <Radio.Option value="option3" description="옵션 3의 상세 설명입니다.">
              옵션 3
            </Radio.Option>
            <Radio.Option value="option4">옵션 4</Radio.Option>
          </div>
        </Radio.Group>
        <div className="mt-6">
          <h2 className="text-lg">현재 선택된 옵션: {selectedOption}</h2>
        </div>
      </div>
    </QueryClientProvider>
  );
}

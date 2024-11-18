"use client";

import { Button } from "@ui/index";

interface ErrorFallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

export default function ErrorFallback({ error, resetErrorBoundary }: ErrorFallbackProps): JSX.Element {
  const handleResetErrorBoundary = (): void => {
    resetErrorBoundary();
  };

  return (
    <div className="flex h-[80vh] items-center justify-center">
      <div className="flex flex-col items-center gap-16 p-24">
        <h1 className="text-2xl-bold text-red-500">오류가 발생했습니다 😢</h1>
        <p className="text-2lg-medium text-custom-black/60">{error.message}</p>
        <h2 className="text-lg font-bold">에러가 발생했습니다</h2>
        <Button variant="Primary" onClick={handleResetErrorBoundary} type="button">
          새로고침
        </Button>
      </div>
    </div>
  );
}

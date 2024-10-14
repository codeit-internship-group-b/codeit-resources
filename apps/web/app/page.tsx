"use client";

import Toast, { notify } from "@ui/src/components/common/Toast";

export default function Home(): JSX.Element {
  const handleSuccessToast = (): void => {
    notify("success", "자리 예약 성공!");
  };

  const handleErrorToast = (): void => {
    notify("error", "자리 예약 실패!");
  };

  return (
    <div>
      <button type="button" onClick={handleSuccessToast} className="bg-purple-400">
        tailwind 확인용
      </button>
      <button type="button" onClick={handleErrorToast} className="bg-primary">
        husky 확인용
      </button>
      <div className="w-10">px 확인용</div>
      <Toast />
    </div>
  );
}

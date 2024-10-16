"use client";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "@ui/styles/Toast";
import { CustomToastOptions } from "@ui/src/types/ToastOption";

import { CheckBoldIcon, CancelIcon } from "@ui/public";

/**
 * 토스트 알림을 표시합니다.
 *
 * @param {NotifyOptions} options - 알림의 옵션 (유형 및 메시지).
 * 
 * @example
 * 
 * const handleSuccessToast = () => {
    notify({ type: 'success', message: 'success' });
  };

 * <button onClick={handleSuccessToast}>
    button ex
   </button>
 *
 * @author 배영준
 */

interface NotifyOptions {
  type: "success" | "error";
  message: string;
}

export function notify(options: NotifyOptions) {
  const { type, message } = options;

  switch (type) {
    case "success":
      toast.success(message, {
        ...CustomToastOptions,
        icon: <CheckBoldIcon className="h-20 w-20" />,
      });
      break;
    case "error":
      toast.error(message, {
        ...CustomToastOptions,
        icon: <CancelIcon className="h-20 w-20" />,
      });
      break;
    default:
      break;
  }
}

export default function Toast() {
  return <CustomToastContainer limit={1} transition={Zoom} {...CustomToastOptions} className="h-44" />;
}

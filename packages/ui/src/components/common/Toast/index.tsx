"use client";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "@ui/styles/Toast";
import { CustomToastOptions } from "@ui/src/types/ToastOption";

import { CheckBoldIcon, CancelIcon } from "@ui/public";

/**
 * 토스트 알림을 표시합니다.
 *
 * @param {"success" | "error"} type - 알림의 유형 (성공 또는 오류).
 * @param {string} message - 토스트에 표시될 메시지.
 * 
 * @example
 * 
 * const handleSuccessToast = () => {
    notify('success', 'success');
  };

 * <button onClick={handleSuccessToast}>
    button ex
   </button>
 *
 * @author 배영준
 */

export function notify(type: "success" | "error", message: string) {
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

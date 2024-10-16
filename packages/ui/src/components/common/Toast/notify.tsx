"use client";

import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastOptions } from "@ui/src/types/ToastOption";
import { CheckBoldIcon, CancelIcon } from "@ui/public";

/**
 * 토스트 알림을 표시합니다.
 *
 * @param options - 알림의 옵션 (유형 및 메시지).
 *
 * @example
 *
 * const handleSuccessToast = () =\> \{
 *   notify(\{ type: 'success', message: 'success' \});
 * \};
 *
 * `<button type=\"button\" onClick={handleSuccessToast}>`
 *   button ex
 * `</button>`
 * `<Toast/>`
 *
 */

interface NotifyOptions {
  type: "success" | "error";
  message: string;
}

export default function notify(options: NotifyOptions): void {
  const { type, message } = options;

  switch (type) {
    case "success":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      toast.success(message, {
        ...CustomToastOptions,
        icon: <CheckBoldIcon className="h-20 w-20" />,
      });
      break;
    case "error":
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      toast.error(message, {
        ...CustomToastOptions,
        icon: <CancelIcon className="h-20 w-20" />,
      });
      break;
    default:
      break;
  }
}
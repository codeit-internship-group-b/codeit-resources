"use client";

import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ToastOptions } from "react-toastify";
import { CustomToastContainer } from "@ui/styles/Toast";
import { CustomToastOptions } from "@ui/src/types/ToastOption";

import { CheckBoldIcon, CancelIcon } from "@ui/public";

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
  return <CustomToastContainer limit={1} transition={Zoom} {...CustomToastOptions} className=" h-44" />;
}

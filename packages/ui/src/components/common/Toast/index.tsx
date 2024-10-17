import { Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CustomToastContainer } from "@ui/styles/Toast";
import { CustomToastOptions } from "@ui/src/types/ToastOption";

export default function Toast(): JSX.Element {
  return <CustomToastContainer limit={1} transition={Zoom} {...CustomToastOptions} />;
}

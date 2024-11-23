import { type PropsWithChildren } from "react";

export default function AdminLayout({ children }: PropsWithChildren): JSX.Element {
  return <div className="md:px-118 text-custom-black md:ml-200 mt-36 px-16 md:mt-80">{children}</div>;
}

import type { ReactNode } from "react";

interface MeetingsLayoutProps {
  children: ReactNode;
}

export default function MeetingsLayout(props: MeetingsLayoutProps): JSX.Element {
  const { children } = props;

  return <section>{children}</section>;
}

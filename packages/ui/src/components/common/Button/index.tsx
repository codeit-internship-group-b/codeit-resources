import { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  className?: string;
  appName: string;
}

export default function Button({ children, className }: ButtonProps) {
  return <button className={className}>{children}</button>;
}

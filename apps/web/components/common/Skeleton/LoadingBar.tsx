interface LoadingBarProps {
  width?: string;
}
export default function LoadingBar({ width = "w-100" }: LoadingBarProps): JSX.Element {
  return <div className={`bg-gray-10 rounded-4 h-12 ${width}`} />;
}

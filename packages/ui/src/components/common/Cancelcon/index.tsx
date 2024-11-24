interface CancelconProps {
  className?: string;
  width?: number;
  height?: number;
  fill?: string;
  variant?: "default" | "circle";
}

export default function Cancelcon({ className, width = 24, height = 24, variant = "default" }: CancelconProps) {
  if (variant === "circle") {
    return (
      <svg width={width} height={height} viewBox="0 0 512 512" fill="#d4d5db" xmlns="http://www.w3.org/2000/svg">
        <path d="M256,48C141.31,48,48,141.31,48,256s93.31,208,208,208,208-93.31,208-208S370.69,48,256,48Zm75.31,260.69a16,16,0,1,1-22.62,22.62L256,278.63l-52.69,52.68a16,16,0,0,1-22.62-22.62L233.37,256l-52.68-52.69a16,16,0,0,1,22.62-22.62L256,233.37l52.69-52.68a16,16,0,0,1,22.62,22.62L278.63,256Z" />
      </svg>
    );
  }

  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M16.4277 8.20812C16.6034 8.03238 16.6034 7.74746 16.4277 7.57173C16.2519 7.396 15.967 7.39601 15.7913 7.57176L11.9998 11.3637L8.20823 7.57176C8.0325 7.39601 7.74757 7.396 7.57183 7.57173C7.39609 7.74746 7.39607 8.03238 7.5718 8.20812L11.3634 12.0001L7.57179 15.7921C7.39606 15.9678 7.39608 16.2527 7.57182 16.4284C7.74756 16.6042 8.03249 16.6042 8.20822 16.4284L11.9998 12.6365L15.7913 16.4284C15.967 16.6042 16.252 16.6042 16.4277 16.4284C16.6034 16.2527 16.6035 15.9678 16.4277 15.7921L12.6361 12.0001L16.4277 8.20812Z"
        fill="white"
        stroke="white"
        strokeLinecap="round"
      />
    </svg>
  );
}

// components/Button.tsx
import { useState } from "react";

export default function Button() {
  const [text, setText] = useState("Click me");

  const handleClick = () => {
    setText("Clicked!");
  };

  return <button onClick={handleClick}>{text}</button>;
}

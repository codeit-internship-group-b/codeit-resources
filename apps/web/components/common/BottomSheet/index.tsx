"use client";

import { useState } from "react";
import { Sheet } from "react-modal-sheet";

export default function SnapSheet() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => { setIsOpen(true); }}>Open sheet</button>

      <Sheet isOpen={isOpen} onClose={() => { setIsOpen(false); }}>
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>{/* Your sheet content goes here */}</Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
    </>
  );
}

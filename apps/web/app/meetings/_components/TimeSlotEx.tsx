// components/TimeSlots.tsx

import React from "react";

const TimeSlotEx: React.FC = () => {
  const slots = Array.from({ length: 48 });

  return (
    <div className="flex">
      {slots.map((_, index) => (
        <div key={index} className="h-16 w-16 border border-gray-300" />
      ))}
    </div>
  );
};

export default TimeSlotEx;

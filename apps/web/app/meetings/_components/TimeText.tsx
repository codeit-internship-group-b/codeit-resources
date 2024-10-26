// components/TimeText.tsx

import React from "react";

const TimeText: React.FC = () => {
  const times = Array.from({ length: 49 }, (_, index) => {
    if (index % 2 === 0) {
      const hour = (index / 2).toString().padStart(2, "0");
      return `${hour}:00`;
    }
    return "";
  });

  return (
    <div className="flex w-full">
      {times.map((time, index) => (
        <div key={index} className="flex min-w-72 items-center justify-center">
          {time ? <span className="text-custom-black/50 text-xs-semibold">{time}</span> : null}
        </div>
      ))}
    </div>
  );
};

export default TimeText;

// components/TimeList.tsx

import React from "react";

const TimeList: React.FC = () => {
  const times = Array.from({ length: 25 }, (_, index) => {
    const hour = index.toString().padStart(2, "0");
    return `${hour}:00`;
  });

  return (
    <div className="flex">
      {times.map((time) => (
        <div key={time} className="py-1">
          {time}
        </div>
      ))}
    </div>
  );
};

export default TimeList;

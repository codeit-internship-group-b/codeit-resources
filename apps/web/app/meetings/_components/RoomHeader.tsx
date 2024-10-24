"use client";

interface RoomHeaderProps {
  roomName: string;
}

export const RoomHeader: React.FC<RoomHeaderProps> = ({ roomName }) => {
  return (
    <div className="rounded-8 text-custom-black/80 border-1 my-28 flex h-48 w-80 items-center justify-center gap-8 border-gray-200/10 bg-white">
      {roomName}
    </div>
  );
};

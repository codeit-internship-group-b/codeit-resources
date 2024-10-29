"use client";

interface RoomNameProps {
  name: string;
}

export default function RoomName(props: RoomNameProps): JSX.Element {
  const { name } = props;

  return (
    <div className="transition-linear md:min-w-128 rounded-8 border-1 text-custom-black/80 text-lg-medium hover:bg-custom-black/90 inline-block h-48 min-w-80 gap-8 border-gray-200/10 bg-white p-12 text-center hover:text-white/90 md:h-60 md:px-32 md:py-16">
      {name}
    </div>
  );
}

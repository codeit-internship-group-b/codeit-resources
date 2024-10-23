import SeatGrid from "./_components/SeatGrid";

export default function Seats(): JSX.Element {
  return (
    <div className="md:px-118 md:py-83 overflow-auto px-16 py-28">
      <SeatGrid />
    </div>
  );
}

import { Chevron } from "@ui/public";
import Link from "next/link";
import SeatGrid from "../../_components/SeatGrid";

export default function SeatsAdmin(): JSX.Element {
  return (
    <div className="text-custom-black">
      <div className="mb-44 flex items-center md:mb-40">
        <Link href="/seats" className="md:hidden">
          <Chevron />
        </Link>
        <h1 className="text-20 md:text-28 relative right-12 m-auto md:static md:m-0">좌석 설정</h1>
      </div>
      <SeatGrid />
    </div>
  );
}

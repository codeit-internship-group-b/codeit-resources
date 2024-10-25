import { Chevron } from "@ui/public";
import Link from "next/link";
import SeatGrid from "../../_components/SeatGrid";

export default function SeatsAdmin(): JSX.Element {
  return (
    <div className="text-custom-black">
      <div className="gap-101 mb-44 flex items-center md:mb-40">
        {/* 모바일일때만 보이게 해야함 */}
        <Link href="/seats">
          <Chevron className="ml-8" />
        </Link>
        <h1 className="text-20 md:text-28">좌석 설정</h1>
      </div>
      <SeatGrid />
    </div>
  );
}

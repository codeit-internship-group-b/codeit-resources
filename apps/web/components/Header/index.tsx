import HeaderTabs from "./HeaderTabs";

interface HeaderProps {
  page: "meetings" | "seats";
}

export default function Header({ page }: HeaderProps): JSX.Element {
  return (
    <div className="h-156 md:h-149 border-custom-black/20 pt-62 w-screen border-b border-solid pl-16 md:pt-24">
      <h1 className="text-custom-black text-2xl-bold md:text-3xl-bold pb-13 md:pb-40">
        {page === "meetings" ? "회의실 예약" : "좌석예약"}
      </h1>
      <HeaderTabs page={page} />
    </div>
  );
}

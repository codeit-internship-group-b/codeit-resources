"use client";
import { CancelIcon, RightIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { useMemo, useState } from "react";
import { notify } from "@ui/index";
import AlertModal from "@ui/src/components/common/ConditionalActionModal/AlertModal";
import { usePathname } from "next/navigation";
import { Sheet } from "react-modal-sheet";
import { useSeatContext } from "../context/SeatContext";
import AdminSeatSetting from "./AdminSeatSetting";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import Sidebar from "@/components/common/Sidebar";

interface SeatButtonProps {
  isLoading?: boolean;
  status: "in-use" | "unavailable" | "available" | "reserved";
  user?: string | null;
  seatNum: string;
}

export default function SeatButton({ isLoading, status = "available", user, seatNum }: SeatButtonProps): JSX.Element {
  const { checkedSeat, handleSelectSeat } = useSeatContext();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const pathname = usePathname();
  const isAdmin = useMemo(() => pathname.includes("admin"), [pathname]);
  const isMobile = useIsMobileStore();
  const isChecked = checkedSeat === seatNum;
  const isDisabled = !isAdmin && (checkedSeat === seatNum || status !== "available" || isLoading);

  const handleButtonClick = (): void => {
    if (checkedSeat && checkedSeat !== seatNum) {
      setIsModalOpen(true);
    } else {
      // post api 연결
      handleSelectSeat(seatNum);
      notify({ type: "success", message: "자리 예약 성공!" });
    }
  };

  const handleAdminButtonClick = (): void => {
    if (isMobile) {
      setIsBottomSheetOpen(true);
      handleSelectSeat(seatNum);
    } else {
      setIsSidebarOpen(true);
      handleSelectSeat(seatNum);
    }
  };

  const handleModalConfirm = (): void => {
    // patch api 연결
    handleSelectSeat(seatNum);
    setIsModalOpen(false);
    notify({ type: "success", message: "자리 예약 성공!" });
  };

  return (
    <span className="group relative">
      <button
        type="button"
        onClick={isAdmin ? handleAdminButtonClick : handleButtonClick}
        className={cn(
          "!text-12 md:w-90 md:!text-16 rounded-4 -z-10 h-36 w-60 min-w-60 overflow-hidden md:h-48",
          isLoading ? "bg-gray-10" : "border-custom-black/20 border border-solid",
          {
            "bg-white hover:bg-purple-200": status === "available" && !isChecked && !isLoading,
            "border-custom-black/30 text-custom-black/30 bg-gray-200/10 font-medium": status === "in-use" && !isLoading,
            "bg-gray-200/5": status === "unavailable" && !isLoading,
            "cursor-not-allowed": !isAdmin && (status === "in-use" || status === "unavailable"),
            "bg-purple-700": isChecked && !isAdmin,
            "border-custom-black": isChecked && isAdmin,
            "bg-white": isChecked && isAdmin && status === "available",
            "transition-linear": !isAdmin,
          },
        )}
        disabled={isDisabled}
      >
        {!isLoading && user ? user : null}
        {status === "unavailable" && !isLoading && <span className="diagonal-line" />}
        {isChecked && !isAdmin ? <RightIcon className="m-auto size-32 fill-white" /> : null}
      </button>
      {isChecked ? (
        <CancelIcon
          onClick={() => {
            handleSelectSeat(seatNum);
          }}
          className={cn(
            "bg-custom-black absolute -right-6 -top-10 size-24 cursor-pointer rounded-full md:-right-4 md:-top-8",
            {
              "hidden group-hover:block": !isAdmin,
            },
          )}
        />
      ) : null}
      <AlertModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={handleModalConfirm}
        title="자리를 이동하시겠어요?"
        content={
          <>
            기존의 자리는 취소되며,
            <br className="md:hidden" /> 선택한 자리가 예약됩니다.
          </>
        }
        cancelButtonName="취소하기"
        confirmButtonName="이동하기"
      />

      <Sheet
        snapPoints={[0.6]}
        isOpen={isBottomSheetOpen}
        onClose={() => {
          setIsBottomSheetOpen(false);
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <AdminSeatSetting status={status} userName={user} />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
        }}
      >
        <AdminSeatSetting status={status} userName={user} />
      </Sidebar>
    </span>
  );
}

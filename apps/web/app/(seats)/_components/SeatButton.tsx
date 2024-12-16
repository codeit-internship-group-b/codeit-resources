/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";
import { RightIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { useMemo, useState } from "react";
import AlertModal from "@ui/src/components/common/ConditionalActionModal/AlertModal";
import { usePathname } from "next/navigation";
import { Sheet } from "react-modal-sheet";
import { formatSelectedDate } from "@ui/src/utils/date";
import { type SeatStatus } from "@repo/types";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import Sidebar from "@/components/common/Sidebar";
import { useDateStore } from "@/app/store/useDateStore";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { isSeat, isSeatReserved } from "@/src/utils/seats";
import { useSeatReservation } from "@/app/_hooks/useSeatReservation";
import { useSeatContext } from "../../../src/contexts/SeatContext";
import AdminSeatSetting from "./AdminSeatSetting";
import SeatCancelButton from "./SeatCancelButton";

interface SeatButtonProps {
  isLoading?: boolean;
  status: SeatStatus;
  itemId: string;
  user?: string | null;
  seatNum: string;
}

export default function SeatButton({
  isLoading,
  status = "available",
  itemId,
  user,
  seatNum,
}: SeatButtonProps): JSX.Element {
  const { checkedSeat, handleSelectSeat, seatReservationId, userReservationData } = useSeatContext();
  const { selectedDate } = useDateStore();
  const { user: authUser, isLoggedIn } = useAuthStore();
  const { createSeatReservation, deleteSeatReservation, modifySeatReservation } = useSeatReservation();
  const pathname = usePathname();
  const isMobile = useIsMobileStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isAdmin = useMemo(() => pathname.includes("admin"), [pathname]);
  const isDisabled = !isAdmin && (checkedSeat === seatNum || status !== "available" || isLoading);

  // 예약 정보
  const reservationData = useMemo(() => {
    if (!isLoggedIn) {
      return undefined;
    }
    return {
      userId: authUser?._id,
      itemType: "seat" as const,
      startAt: `${formatSelectedDate(selectedDate)}T${new Date().toISOString().slice(11, 19)}Z`,
      endAt: `${formatSelectedDate(selectedDate)}T23:59:59Z`,
      status: "reserved" as const,
    };
  }, [authUser?._id, selectedDate, isLoggedIn]);

  // 현재 로그인 된 사용자의 좌석정보를 기반으로 특정 좌석 예약 여부 확인
  const userSeatInfo = useMemo(() => {
    if (!Array.isArray(userReservationData) || !seatNum || !authUser?._id) {
      return { isUsersSeat: false, reservationId: null };
    }

    const foundReservation = userReservationData.find((res) => {
      if (!isSeat(res.item) || !res.user?._id) return false;

      const isSameSeat = res.item.name === seatNum;
      const isCurrentUserReservation = res.user._id === authUser._id;

      return isSameSeat && isCurrentUserReservation;
    });

    setIsChecked(Boolean(foundReservation) || checkedSeat === seatNum);

    return {
      isUsersSeat: Boolean(foundReservation),
      reservationId: foundReservation?._id ?? null,
    };
  }, [userReservationData, seatNum, authUser, checkedSeat]);

  // 좌석예약 버튼 클릭시 동작
  const handleButtonClick = (): void => {
    if (isSeatReserved(userReservationData)) {
      setIsModalOpen(true);
    } else if (!reservationData) {
      throw new Error("예약 데이터가 없습니다");
    } else {
      createSeatReservation(
        {
          seatId: itemId,
          reservationData,
        },
        {
          onSuccess: () => {
            handleSelectSeat(seatNum);
            setIsChecked(true);
          },
          onError: () => {
            handleSelectSeat(null);
            setIsChecked(false);
          },
        },
      );
    }
  };

  // 좌석설정 관리자 버튼
  const handleAdminButtonClick = (): void => {
    setIsClicked(true);
    if (isMobile) {
      setIsBottomSheetOpen(true);
      handleSelectSeat(seatNum);
    } else {
      setIsSidebarOpen(true);
      handleSelectSeat(seatNum);
    }
  };

  // 모달에서 자리바꾸기 확인버튼 눌렀을 때
  const handleModalConfirm = (): void => {
    if (seatReservationId && seatReservationId.length > 0) {
      modifySeatReservation(
        { seatId: itemId, reservationData, reservationId: seatReservationId },
        {
          onSuccess: () => {
            handleSelectSeat(seatNum);
            setIsChecked(true);
          },
          onError: () => {
            handleSelectSeat(null);
            setIsChecked(false);
          },
        },
      );
      setIsModalOpen(false);
    }
  };

  // 좌석예약 취소(삭제) 버튼 눌렀을 때
  const handleCancelButtonClick = (reservationId: string | null): void => {
    deleteSeatReservation(reservationId);
    setIsChecked(false);
  };

  // 좌석 이름 설정
  let userName = null;
  if (!isLoading) {
    if (user && !isAdmin && !isChecked) {
      userName = user;
    } else if (user && !isChecked) {
      userName = null;
    }
    if (user && isAdmin) {
      userName = user;
    }
  }

  return (
    <span className="relative group">
      <button
        type="button"
        onClick={isAdmin ? handleAdminButtonClick : handleButtonClick}
        className={cn(
          "!text-12 md:w-90 md:!text-16 rounded-4 -z-10 h-36 w-60 min-w-60 overflow-hidden md:h-48",
          isLoading ? "bg-gray-10 animate-pulse" : "border-custom-black/20 border border-solid",
          {
            "bg-white hover:bg-purple-200": status === "available" && !isChecked && !isLoading,
            "border-custom-black/30 text-custom-black/30 bg-gray-200/10 font-medium":
              status === "in-use" || (status === "reserved" && !isLoading),
            "bg-gray-200/5": status === "unavailable" && !isLoading,
            "cursor-not-allowed": !isAdmin && (status === "in-use" || status === "unavailable"),
            "bg-purple-700": isChecked && !isAdmin,
            "bg-white": isChecked && isAdmin && status === "available",
            "transition-linear": !isAdmin,
            "!border-black": isClicked,
          },
        )}
        disabled={isDisabled}
      >
        {userName}
        {status === "unavailable" && !isLoading && <span className="diagonal-line" />}
        {isChecked && !isAdmin ? <RightIcon className="m-auto size-32 fill-white" /> : null}
      </button>
      {isChecked && !isAdmin ? (
        <SeatCancelButton
          reservationId={userSeatInfo?.reservationId}
          onCancel={handleCancelButtonClick}
          isAdmin={isAdmin}
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
          setIsClicked(false);
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <AdminSeatSetting
              status={status}
              userName={user}
              seatNum={seatNum}
              itemId={itemId}
              onClose={() => {
                setIsBottomSheetOpen(false);
                setIsClicked(false);
              }}
            />
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>

      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => {
          setIsSidebarOpen(false);
          setIsClicked(false);
        }}
      >
        <AdminSeatSetting
          status={status}
          userName={user}
          seatNum={seatNum}
          itemId={itemId}
          onClose={() => {
            setIsSidebarOpen(false);
            setIsClicked(false);
          }}
        />
      </Sidebar>
    </span>
  );
}

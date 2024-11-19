/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unnecessary-condition */
"use client";
import { CancelIcon, RightIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { useMemo, useState } from "react";
import { notify } from "@ui/index";
import AlertModal from "@ui/src/components/common/ConditionalActionModal/AlertModal";
import { usePathname } from "next/navigation";
import { Sheet } from "react-modal-sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { type ReservedResponse, type ReservationRequestBody, type ReservationResponse } from "@repo/types";
import { formatSelectedDate } from "@ui/src/utils/date";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import Sidebar from "@/components/common/Sidebar";
import { useDateStore } from "@/app/store/useDateStore";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { createSeatReservationData, deleteReservationData, modifyReservationData } from "@/api/reservation";
import { isSeat, isSeatReserved } from "@/src/utils/seats";
import { useSeatContext } from "../../../src/contexts/SeatContext";
import AdminSeatSetting from "./AdminSeatSetting";

interface SeatButtonProps {
  isLoading?: boolean;
  status: "in-use" | "unavailable" | "available" | "reserved";
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
  const { user: authUser } = useAuthStore();
  const pathname = usePathname();
  const isMobile = useIsMobileStore();
  const queryClient = useQueryClient();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const isAdmin = useMemo(() => pathname.includes("admin"), [pathname]);
  const isDisabled = !isAdmin && (checkedSeat === seatNum || status !== "available" || isLoading);

  // 좌석 예약 생성
  const { mutate: createSeatReservationMutate } = useMutation<
    ReservationResponse,
    Error,
    { seatId: string; reservationData: typeof reservationData }
  >({
    mutationFn: ({ seatId, reservationData }) => createSeatReservationData({ seatId, reservationData }),
    onSuccess: (response) => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["seats"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
      ]);
      notify({ type: "success", message: response.message });
    },
    onError: (error) => {
      setIsChecked(false);
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  // 좌석 예약 삭제
  const { mutate: deleteSeatReservationMutate } = useMutation({
    mutationFn: (reservationId: string | null) => deleteReservationData(reservationId),
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["seats"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
      ]);
      setIsChecked(false);
      notify({ type: "success", message: "자리 예약을 삭제했습니다" });
    },
    onError: (error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  // 좌석 예약 수정
  const { mutate: modifyReservationMutate } = useMutation<
    { deleteResult: ReservedResponse; createResult: ReservedResponse },
    Error,
    { seatId: string; reservationData: ReservationRequestBody; reservationId: string | null }
  >({
    mutationFn: ({ seatId, reservationData, reservationId }) => {
      return modifyReservationData({
        seatId,
        reservationData,
        reservationId,
      });
    },
    onSuccess: () => {
      void Promise.all([
        queryClient.invalidateQueries({ queryKey: ["seats"] }),
        queryClient.invalidateQueries({ queryKey: ["user", "reservations"] }),
      ]);
      handleSelectSeat(seatNum);
      notify({ type: "success", message: "좌석 예약 성공!" });
    },
    onError: (error) => {
      notify({ type: "error", message: `오류 발생: ${error.message}` });
    },
  });

  // 예약 정보
  const reservationData = {
    userId: authUser?._id,
    itemType: "seat",
    startAt: `${formatSelectedDate(selectedDate)}T${new Date().toISOString().slice(11, 19)}Z`,
    endAt: `${formatSelectedDate(selectedDate)}T23:59:59Z`,
    status: "reserved",
  };

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
    } else {
      createSeatReservationMutate({ seatId: itemId, reservationData });
      handleSelectSeat(seatNum);
      setIsChecked(true);
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
      modifyReservationMutate({ seatId: itemId, reservationData, reservationId: seatReservationId });
      setIsModalOpen(false);
    }
  };

  // 좌석예약 취소(삭제) 버튼 눌렀을 때
  const handleCancelButtonClick = (reservationId: string): void => {
    deleteSeatReservationMutate(reservationId);
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
    <span className="group relative">
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
        <CancelIcon
          onClick={(e) => {
            e.stopPropagation();
            if (userSeatInfo.reservationId) {
              handleCancelButtonClick(userSeatInfo.reservationId);
            } else {
              notify({
                type: "error",
                message: "예약 정보를 찾을 수 없습니다. 페이지를 새로고침해주세요.",
              });
            }
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

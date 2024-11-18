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
import { type IEquipment, type IRoom, type ISeat, type IReservation } from "@repo/types";
import { formatSelectedDate } from "@ui/src/utils/date";
import useIsMobileStore from "@/app/store/useIsMobileStore";
import Sidebar from "@/components/common/Sidebar";
import { useDateStore } from "@/app/store/useDateStore";
import { useAuthStore } from "@/src/stores/useAuthStore";
import { createSeatReservationData, deleteReservationData } from "@/api/reservation";
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

  const isAdmin = useMemo(() => pathname.includes("admin"), [pathname]);
  const isDisabled = !isAdmin && (checkedSeat === seatNum || status !== "available" || isLoading);

  // 좌석 예약되어있는지 확인 (타입 가드)
  function isSeatReserved(reservedData: IReservation[] | undefined): boolean | undefined {
    if (Array.isArray(reservedData)) {
      return reservedData.some((item) => item.itemType === "seat");
    }
    return undefined;
  }

  // 좌석인지 아닌지 (타입 가드)
  function isSeat(item: string | IRoom | ISeat | IEquipment): item is ISeat {
    return typeof item === "object" && item !== null && "name" in item;
  }
  interface ReservationResponse {
    message: string;
    savedReservation: IReservation[];
  }

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

  // 예약 정보
  const reservationData = {
    userId: authUser?._id,
    itemType: "seat",
    startAt: `${formatSelectedDate(selectedDate)}T${new Date().toISOString().slice(11, 19)}Z`,
    endAt: `${formatSelectedDate(selectedDate)}T23:59:59Z`,
    status: "reserved",
  };

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

  // 현재 로그인 된 사용자의 좌석정보를 기반으로 특정 좌석 예약 여부 확인
  const userSeatInfo = useMemo(() => {
    if (!Array.isArray(userReservationData) || !seatNum || !authUser) {
      return { isUsersSeat: false, reservationId: null };
    }

    const foundReservation = userReservationData.find((res) => {
      if (!isSeat(res.item)) return false;

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

  // 좌석 예약 관리자 버튼
  const handleAdminButtonClick = (): void => {
    if (isMobile) {
      setIsBottomSheetOpen(true);
      handleSelectSeat(seatNum);
    } else {
      setIsSidebarOpen(true);
      handleSelectSeat(seatNum);
    }
  };

  // 모달에서 확인버튼 눌렀을 때 동작
  const handleModalConfirm = (): void => {
    if (seatReservationId && seatReservationId.length > 0) {
      deleteSeatReservationMutate(seatReservationId);
      createSeatReservationMutate({ seatId: itemId, reservationData });
      handleSelectSeat(seatNum);
      setIsModalOpen(false);
      notify({ type: "success", message: "자리 예약 성공!" });
    }
    notify({ type: "error", message: "자리 예약 못바꿈!" });
  };

  // 좌석예약 취소 버튼 눌렀을 때
  const handleCancelButtonClick = (reservationId: string): void => {
    deleteSeatReservationMutate(reservationId);
    setIsChecked(false);
  };

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
            "border-custom-black": isChecked && !isAdmin,
            "bg-white": isChecked && isAdmin && status === "available",
            "transition-linear": !isAdmin,
          },
        )}
        disabled={isDisabled}
      >
        {!isLoading && user && !isAdmin && !isChecked ? user : null}
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
        }}
      >
        <Sheet.Container>
          <Sheet.Header />
          <Sheet.Content>
            <AdminSeatSetting status={status} userName={user} seatNum={seatNum} itemId={itemId} />
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
        <AdminSeatSetting status={status} userName={user} seatNum={seatNum} itemId={itemId} />
      </Sidebar>
    </span>
  );
}

// 에러 및 버그
// 1. 좌석예약
//    - 체크 버튼 눌렀을 때, 검정선이 아니라 보라색 border 적용 // 호버했을때도 마찬가지
//    - loading 될 때 animate-pulse 적용안됨 확인 => 이유를 모르겠음;; 원래 다른 프로젝트에서는 아무 설정 안해도 바로 되는데;; 하
//    - 새로고침 될 때 & 자리 예약 삭제할 때 배경회색처리된채 이름 보이는것
//    - 좌석 수정 함수 새로 만들기
//    - 프로필 이미지 받아오는 걸로 수정
//    - 좌석 예약 삭제했을 때 css 그대로 남아있음 ㅅㅂ ㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂㅅㅂ

// 2. 좌석설정
//    - 이름 보이지 않음
//    - 좌석 편집 사이드바에서 확인 누르고 닫히게 만들기
//    - 버튼 눌렀을 cancelIcon + 검정색 보더 적용 => 취소 버튼 눌렀을 때 기능?

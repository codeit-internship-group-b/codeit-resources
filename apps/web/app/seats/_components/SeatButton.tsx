"use client";
import { CancelIcon, RightIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { useState } from "react";
import { notify } from "@ui/index";
import { useSeatContext } from "../context/SeatContext";
import ChangeSeatModal from "./ChangeSeatModal";

interface SeatButtonProps {
  isLoading?: boolean;
  status: "in-use" | "unavailable" | "available" | "reserved";
  user?: string | null;
  seatNum: string;
}

export default function SeatButton({ isLoading, status = "available", user, seatNum }: SeatButtonProps): JSX.Element {
  // Admin 기능에 쓰일 예정
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false);
  const { checkedSeat, handleSelectSeat } = useSeatContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isChecked = checkedSeat === seatNum;
  const isDisabled = checkedSeat === seatNum || status !== "available" || isLoading;

  const handleButtonClick = (): void => {
    if (checkedSeat && checkedSeat !== seatNum) {
      setIsModalOpen(true);
    } else {
      // post api 연결
      handleSelectSeat(seatNum);
      notify({ type: "success", message: "자리 예약 성공!" });
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
        onClick={handleButtonClick}
        className={cn(
          "!text-12 md:w-90 md:!text-16 rounded-4 h-36 w-60 min-w-60 overflow-hidden md:h-48",
          isLoading ? "bg-gray-10" : "border-custom-black/20 border border-solid",
          {
            "transition-linear bg-white hover:bg-purple-200": status === "available" && !isChecked && !isLoading,
            "border-custom-black/30 text-custom-black/30 bg-gray-200/10 font-medium": status === "in-use" && !isLoading,
            "bg-gray-200/5": status === "unavailable" && !isLoading,
            "cursor-not-allowed": !isAdmin && (status === "in-use" || status === "unavailable"),
            "bg-purple-700": isChecked,
          },
        )}
        disabled={isDisabled}
      >
        {!isLoading && user ? user : null}
        {status === "unavailable" && !isLoading && <span className="diagonal-line" />}
        {isChecked ? <RightIcon className="m-auto size-32 fill-white" /> : null}
      </button>
      {isChecked ? (
        <CancelIcon
          onClick={() => {
            handleSelectSeat(seatNum);
          }}
          className="bg-custom-black absolute -right-4 -top-8 hidden size-24 cursor-pointer rounded-full group-hover:block"
        />
      ) : null}
      <ChangeSeatModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
        }}
        onConfirm={handleModalConfirm}
      />
    </span>
  );
}

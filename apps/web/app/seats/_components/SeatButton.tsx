"use client";
import { CancelIcon, RightIcon } from "@ui/public";
import cn from "@ui/src/utils/cn";
import { useState } from "react";
import { useSeatContext } from "../context/SeatContext";

interface SeatButtonProps {
  isLoading?: boolean;
  status?: string;
  user?: string | null;
  seatNum: string;
}

export default function SeatButton({ isLoading, status = "available", user, seatNum }: SeatButtonProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isAdmin, setIsAdmin] = useState(false);
  const { checkedSeat, handleSelectSeat } = useSeatContext();
  const isChecked = checkedSeat === seatNum;
  const isDisabled = (Boolean(checkedSeat) && checkedSeat !== seatNum) || status !== "available" || isLoading;

  return (
    <span className="group relative">
      <button
        type="button"
        onClick={() => {
          handleSelectSeat(seatNum);
        }}
        className={cn(
          "!text-12 md:w-90 md:!text-16 rounded-4 h-36 w-60 min-w-60 overflow-hidden md:h-48",
          isLoading ? "bg-gray-10" : "border-custom-black/20 border border-solid",
          {
            "transition-linear bg-white hover:bg-purple-200": status === "available" && !isChecked,
            "border-custom-black/30 text-custom-black/30 bg-gray-200/10 font-medium": status === "fixed",
            "bg-gray-200/5": status === "unavailable",
            "cursor-not-allowed": !isAdmin && (status === "fixed" || status === "unavailable"),
            "bg-purple-700": isChecked,
          },
        )}
        disabled={isDisabled}
      >
        {user ? user : null}
        {status === "unavailable" && <span className="diagonal-line" />}
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
    </span>
  );
}

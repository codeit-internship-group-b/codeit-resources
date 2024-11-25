import Dropdown from "@ui/src/components/common/Dropdown";
import { useQuery } from "@tanstack/react-query";
import { type TBaseItem } from "@repo/types";
import { getAllItems } from "@/api/items";
import { MEETING_ROOMS_TYPE } from "@/app/constants/meetingRoomsType";
import { ERROR_MESSAGES, FORM_LABELS } from "@/app/constants/reservationFormConstants";
import { type RoomDropdownProps } from "@/app/types/ReservationFormTypes";

export function RoomDropdown({ selectedRoom, onSelect }: RoomDropdownProps): JSX.Element {
  const {
    data: roomsData = [],
    isLoading,
    isError,
  } = useQuery<TBaseItem[]>({
    queryKey: ["Rooms", MEETING_ROOMS_TYPE],
    queryFn: () => getAllItems({ itemType: MEETING_ROOMS_TYPE }),
  });

  return (
    <Dropdown
      selectedValue={selectedRoom}
      onSelect={(value: string | boolean) => {
        if (typeof value === "string") {
          onSelect(value);
        }
      }}
    >
      <Dropdown.Toggle title={FORM_LABELS.selectRoom}>{selectedRoom || FORM_LABELS.selectRoom}</Dropdown.Toggle>
      <Dropdown.Wrapper className="max-h-160 md:max-h-300 no-scrollbar overflow-y-auto">
        {isLoading ? (
          <div>회의실 로딩 중...</div>
        ) : isError ? (
          <div>{ERROR_MESSAGES.roomFetchError}</div>
        ) : (
          roomsData.map((room) => (
            <Dropdown.Item key={room._id} value={room.name}>
              {room.name}
            </Dropdown.Item>
          ))
        )}
      </Dropdown.Wrapper>
    </Dropdown>
  );
}

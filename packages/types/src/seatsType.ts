export interface ReservationRequestBody {
  userId: string;
  itemType: "seat" | "room" | "equipment";
  startAt: string;
  endAt: string;
  status?: string;
  notes?: string;
  attendees?: string[];
}

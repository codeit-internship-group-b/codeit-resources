export interface ReservationRequestBody {
  userId: string | undefined;
  itemType: string;
  startAt: string;
  endAt: string;
  status: string;
  notes?: string;
  attendees?: string[];
}

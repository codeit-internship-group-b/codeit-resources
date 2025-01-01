import { IReservation } from "./reservationType";
import { IUser } from "./userType";

export interface ResponseType<T> {
  data: T;
  message: string;
  status: "success" | "error";
}

export interface SignInResponseType {
  accessToken: string;
  message: string;
  status: "success" | "error";
  user: IUser;
}

export interface ReservationResponse {
  message: string;
  savedReservation: IReservation[];
}

export interface MessageResponse {
  message: string;
}

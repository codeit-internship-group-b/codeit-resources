import { IUser } from "./userType";

export interface ResponseType<T> {
  data?: T;
  message?: string;
  status?: "success" | "error";
}

export interface SignInResponseType<T> {
  accessToken?: T;
  message?: string;
  status?: "success" | "error";
  user?: IUser;
}

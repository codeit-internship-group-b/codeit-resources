import { type IUser } from "@repo/types";

export interface LoginData {
  user: IUser;
  accessToken: string;
}
export interface Message<T> {
  type: string;
  data: T;
}
export type WebviewLoginMessageHandler = (_data: LoginData) => void | Promise<void>;

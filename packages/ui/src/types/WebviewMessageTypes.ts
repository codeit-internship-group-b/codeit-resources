import { type IUser } from "@repo/types";

export type WebviewMessageType = "LOGIN_SUCCESS" | "LOGOUT_SUCCESS" | "LOGIN_ERROR" | "AUTO_LOGIN";
export type WebviewLoginMessageHandler = (_data: { user: IUser; accessToken: string }) => void | Promise<void>;

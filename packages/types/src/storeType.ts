import { IUser } from "./userType";

export interface AuthStore {
  user: IUser | null;
  isLoggedIn: boolean;
  login: (user: IUser) => void;
  logout: () => void;
}

export interface StorageType<T = unknown> {
  state?: T | null;
}

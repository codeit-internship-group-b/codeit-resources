export interface ResponseAPIType<T> {
  data?: T;
  message?: string;
  status?: "success" | "error";
}

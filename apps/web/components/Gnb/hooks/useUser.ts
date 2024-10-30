import { type IUser } from "@repo/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { getCookie } from "cookies-next";
import { getUser } from "@/app/api/users";

export const useUser = (): UseQueryResult<IUser> => {
  const accessToken = getCookie("accessToken");

  return useQuery<IUser, AxiosError<{ message?: string }>>({
    queryKey: ["userResponse"],
    queryFn: () => getUser(),
    enabled: Boolean(accessToken),
  });
};

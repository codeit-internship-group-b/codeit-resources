import { type IUser } from "@repo/types";
import { useQuery, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { hasCookie } from "cookies-next";
import { getUser } from "@/app/api/users";

export const useUser = (): UseQueryResult<IUser> => {
  const isAccess = hasCookie("accessToken");

  return useQuery<IUser, AxiosError<{ message?: string }>>({
    queryKey: ["userResponse"],
    queryFn: () => getUser(),
    enabled: isAccess,
  });
};

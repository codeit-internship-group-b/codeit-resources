import { type IUser } from "@repo/types";
import { useQuery, type UseSuspenseQueryResult, type UseQueryResult, useSuspenseQuery } from "@tanstack/react-query";
import { hasCookie } from "cookies-next";
import { getUser } from "@/api/users";

export const useUserQuery = (): UseQueryResult<IUser> => {
  const isAccess = hasCookie("accessToken");

  return useQuery<IUser>({
    queryKey: ["userResponse"],
    queryFn: getUser,
    enabled: isAccess,
  });
};

export const useSuspenseUserQuery = (): UseSuspenseQueryResult<IUser> => {
  return useSuspenseQuery<IUser>({
    queryKey: ["userResponse"],
    queryFn: getUser,
  });
};

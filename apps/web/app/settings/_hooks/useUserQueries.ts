import { type IUser } from "@repo/types";
import { useQuery, type UseSuspenseQueryResult, type UseQueryResult, useSuspenseQuery } from "@tanstack/react-query";
import { hasCookie } from "cookies-next";
import { getUser } from "@/api/users";
import { QUERY_KEYS } from "@/lib/queryKey";

export const useUserQuery = (): UseQueryResult<IUser> => {
  const isAccess = hasCookie("accessToken");

  return useQuery<IUser>({
    queryKey: QUERY_KEYS.USER,
    queryFn: getUser,
    enabled: isAccess,
  });
};

export const useSuspenseUserQuery = (): UseSuspenseQueryResult<IUser> => {
  return useSuspenseQuery<IUser>({
    queryKey: QUERY_KEYS.USER,
    queryFn: getUser,
  });
};

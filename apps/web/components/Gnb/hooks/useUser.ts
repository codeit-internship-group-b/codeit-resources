import { type IUser } from "@repo/types";
import { useQuery, useQueryClient, type UseQueryResult } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { getUser } from "@/app/api/users";

export const useUser = (): UseQueryResult<IUser> => {
  const queryClient = useQueryClient();
  const cachedUserData = queryClient.getQueryData<IUser>(["userData"]);

  return useQuery<IUser, AxiosError<{ message?: string }>>({
    queryKey: ["userData", { userId: cachedUserData?._id }],
    queryFn: () => getUser(cachedUserData?._id ?? ""),
    enabled: Boolean(cachedUserData?._id),
  });
};

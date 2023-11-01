import { useQuery } from "@tanstack/react-query";

import { Authentication } from "../../../../interfaces/auth";

export function useQueryAuthentication(auth: Authentication) {
  
  const { useSession, findUserByEmailOrUsername, useEmployeesStore } = auth
  const { data: nextSession, status } = useSession();
  const setSession = useEmployeesStore(state=>state.setSession)

  const user = nextSession?.user.username
    ? "credential-employee"
    : "credential-client";

  const sessionQuery = useQuery({
    queryKey: [user],

    queryFn: async () => {
      if (status === "authenticated") {
        const data = await findUserByEmailOrUsername();
        setSession(data);
        return data;
      }
      return null;
    },

    enabled: !!nextSession?.user?.email!,
    staleTime: Infinity,
    refetchOnMount: true,
  });

  return { sessionQuery, status, nextSession };
}

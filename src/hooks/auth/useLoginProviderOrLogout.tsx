import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useLoginProviderOrLogout() {
  const session = useSession();
  const queryClient = useQueryClient();

  const urlUser = !!session.data?.user?.username
    ? "/admin/auth"
    : "/auth/login";

  const logOut = useMutation({
    mutationFn:  () =>  signOut({ callbackUrl: urlUser }),

    onSuccess:()=> {
      queryClient.removeQueries();
    },
  });

  const loginProvider = useMutation({
    mutationFn: (providerId: string) => signIn(providerId),
    
    onSuccess: (user) =>
      queryClient.setQueriesData(["credential-client"], user),
  });

  return {
    loginProvider,
    logOut,
  };
}

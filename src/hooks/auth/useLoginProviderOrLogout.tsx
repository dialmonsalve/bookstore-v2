import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useLoginProviderOrLogout = () => {

  const queryClient = useQueryClient();
  const session = useSession();

  const urlUser = !!session.data?.user.username ? "/admin/auth" : "/auth/login"

  const logOut = useMutation({
    mutationFn: async () => await signOut({callbackUrl: urlUser}),
    onSuccess: () => {
      queryClient.removeQueries();
    }
  })

  const loginProvider = useMutation({
    mutationFn: async (providerId: string) => await signIn(providerId)
  })

  return {
    loginProvider,
    logOut
  }

}




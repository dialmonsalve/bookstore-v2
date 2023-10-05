import { signIn, signOut, useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store";

import { userAuth } from "@/api";

import { IClient } from "@/types";

export function useLoginProvider() {
  const session = useSession();
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);

  const urlUser = !!session.data?.user?.username
    ? "/admin/auth"
    : "/auth/login";

  const logOutMutation = useMutation({
    mutationFn: () => signOut({ callbackUrl: urlUser }),

    onSuccess: () => {
      queryClient.removeQueries();
    },
    onError: (error: any) => {
      console.log(error.message);
    },
  });

  const loginProviderMutation = useMutation({
    mutationFn: (providerId: string) => signIn(providerId),

    onSuccess: (user) =>
      queryClient.setQueriesData(["credential-client"], user),

    onError: (error: any) => {
      console.log(error.message);
    },
  });

  const registerClientMutation = useMutation({
    mutationFn: (data: IClient) => {
      return userAuth.registerUser(data, null, true);
    },

    onSuccess: async (client, { email, password, name }) => {
      queryClient.setQueriesData(["credential-client"], client);
      await signIn("credentials", { email, password, name });
      setAlert("success", true, "Usuario Creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  return {
    loginProviderMutation,
    logOutMutation,
    registerClientMutation
  };
}

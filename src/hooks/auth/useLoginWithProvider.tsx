import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store";

export function useLoginWithProvider() {
  const queryClient = useQueryClient();
  const setAlert = useUisStore((state) => state.setAlert);

  const loginWithProvider = useMutation({
    mutationFn: (providerId: string) => signIn(providerId),

    onSuccess: (user) =>
      queryClient.setQueriesData(["credential-client"], user),

    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  return loginWithProvider;
}

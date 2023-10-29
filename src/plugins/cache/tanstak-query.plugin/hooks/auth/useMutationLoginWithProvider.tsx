import { useMutation, useQueryClient } from "@tanstack/react-query";

import { LoginWithProvider } from "../../interfaces/tanstak-query.auth";

export function useMutationLoginWithProvider(actionLogin: LoginWithProvider) {
  
  const {signIn, useUIStore } = actionLogin
  const queryClient = useQueryClient();
  const setAlert = useUIStore((state) => state.setAlert);

  return useMutation({
    mutationFn: (providerId: string) => signIn(providerId),

    onSuccess: (user) =>
      queryClient.setQueriesData(["credential-client"], user),

    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}

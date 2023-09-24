import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { useUisStore } from "@/store";

export function useLogin(fieldForm: string) {

  const queryClient = useQueryClient();

  const setErrorApiMessage = useUisStore(state => state.setErrorMessage);

  const loginUser = useMutation({
    mutationFn: (formData: { [key: string]: string; password: string }) => {
      const data = {

        [fieldForm]: formData[fieldForm],
        password: formData.password,
      };

      return userAuth.handleLogin(data);
    },
    onSuccess: async ({ hasError, message, user }, formData) => {

      if (hasError) {
        setErrorApiMessage(true, message!)
        setTimeout(() => setErrorApiMessage(false), 3000);
        return;
      }
      queryClient.setQueriesData([fieldForm === "username" ? "credential-employee" : "credential-client"], user);
      await signIn('credentials', formData);
    }
  })

  return loginUser
}

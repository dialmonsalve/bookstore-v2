import { useState } from "react";
import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";

export const useLogin = (fieldForm: string) => {

  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState(''); 

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
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      queryClient.setQueriesData([fieldForm === "username" ? "credential-employee" : "credential-client"], user);
      await signIn('credentials', formData);
    }
  })

  return {
    loginUser,
    showError,
    errorApiMessage,
    setShowError,

  };
}

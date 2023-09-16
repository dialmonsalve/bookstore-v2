import { useState } from "react";
import { signIn } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { IClient, } from "@/types";

export function  useRegisterCLient ()  {

  const queryClient = useQueryClient();
  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

  const registerCLient = useMutation({
    mutationFn: (data: IClient) => {
      return userAuth.registerUser(data, null, true);
    },
    onSuccess: async ({ hasError, message, user: client }, { email, password, name }) => {

      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      queryClient.setQueriesData(["credential-client"], client);
      await signIn('credentials', { email, password, name });
    },
  })

  return {
    registerCLient,
    showError,
    errorApiMessage,
    setShowError,
  };
}

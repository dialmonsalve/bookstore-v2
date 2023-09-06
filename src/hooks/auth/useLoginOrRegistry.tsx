import { useState } from "react";
import { signIn,   } from "next-auth/react";
import { useMutation,  useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";

export const useLoginOrRegistry = (fieldForm: string) => {

  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

  const queryClient = useQueryClient();

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
      queryClient.setQueriesData([fieldForm === "username" ? "staff" : "client"], user);
      await signIn('credentials', formData);
    }
  })



  const registerUser = useMutation({
    mutationFn: (formData: { [key: string]: string; password: string }) => {

      const data = {
        [fieldForm]: formData[fieldForm],
        password: formData.password,
        name: formData.name,
        lastName: formData.lastName,
        image: formData.image,
        role: formData.role,
        phone: formData.phone,
        email: formData["email"] || formData.email
      };


      return userAuth.registerUser(data);
    },
    onSuccess: async ({ hasError, message, user }, { email, password, name, username }) => {

      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return hasError
      }
      queryClient.setQueriesData([username ? "staff" : "client"], user);

      if (username) return;
      await signIn('credentials', { email, password, name });

      return hasError = false;
    }
  })

  return {
    loginUser,
    registerUser,
    showError,
    errorApiMessage,
    setShowError,

  };
}

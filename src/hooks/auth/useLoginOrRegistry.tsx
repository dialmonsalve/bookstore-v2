import { useState } from "react";
import { signIn,   } from "next-auth/react";
import { useMutation,  useQueryClient } from "@tanstack/react-query";

import { userAuth } from "@/api";
import { useRouter } from "next/router";

export const useLoginOrRegistry = (fieldForm: string) => {

  const queryClient = useQueryClient();
  const router = useRouter()
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

      console.log(fieldForm);
      
      queryClient.setQueriesData([fieldForm === "username" ? "credential-staff" : "credential-client"], user);
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
      }
      queryClient.setQueriesData([username ? "credential-staff" : "credential-client"], user);

      if (username) {
        router.push('/admin/store/users')
        return
      };
      await signIn('credentials', { email, password, name });

    },
    
  })

  return {
    loginUser,
    registerUser,
    showError,
    errorApiMessage,
    setShowError,

  };
}

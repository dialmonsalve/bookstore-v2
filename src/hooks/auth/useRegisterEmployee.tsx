import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { userAuth } from "@/api";
import { useEmployeesStore } from "@/store/users";

import { IEmployee } from "@/types";

export const useRegisterEmployee = () => {

  const adminRole = useEmployeesStore(state => state.session?.role);
  const userAdmin = useEmployeesStore(state => state.session?.username);
  const queryClient = useQueryClient();
  const router = useRouter()
  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState('');

  const registerEmployee = useMutation({
    mutationFn: (data: IEmployee) => {
      return userAuth.registerUser(data, { adminRole, userAdmin }, false);
    },
    onSuccess: async ({ hasError, message, user: employee }) => {

      if (hasError) {
        setShowError(true);
        setErrorApiMessage(message!)
        setTimeout(() => setShowError(false), 3000);
        return;
      }
      queryClient.setQueriesData(["credential-employee"], employee);
      router.push('/admin/users')
    },
  })

  return {
    registerEmployee,
    showError,
    errorApiMessage,
    setShowError,
  };
}

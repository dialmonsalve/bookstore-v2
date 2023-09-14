import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

import { userAuth } from "@/api";
import { useEmployeesStore } from "@/store/employee";

import { IEmployee } from "@/types";
import { useUIContext } from "../context";

export function  useRegisterEmployee()  {

  const [showError, setShowError] = useState(false);
  const [errorApiMessage, setErrorApiMessage] = useState<string | null>('');
  const router = useRouter();
  const queryClient = useQueryClient();
  const {setAlert} = useUIContext();
  
  const adminRole = useEmployeesStore(state => state.session?.role);
  const userAdmin = useEmployeesStore(state => state.session?.username);

  const registerEmployee = useMutation(
    async function (data: IEmployee) {
      return userAuth.registerUser(data, { adminRole, userAdmin }, false
      )
    },
    {
      onSuccess: async ({ hasError, message, user: employee }) => {
        if (hasError) {
          setShowError(true);
          setErrorApiMessage(message!)
          return;
        }
        queryClient.setQueriesData(["credential-employee"], employee);
        router.push('/admin/users')
        setAlert()
      },
    }
  )

  return {
    registerEmployee,
    showError,
    errorApiMessage
  }
}
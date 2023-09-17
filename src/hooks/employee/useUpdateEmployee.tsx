import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store/ui";

import { updateEmployee } from "@/api/employee/employee";
import { IEmployee } from "@/types";
import { useEmployees } from ".";

export const useUpdateEmployee = (_id: string) => {

  const router = useRouter();
  const queryClient = useQueryClient();

  const setAlert = useUisStore(state => state.setAlert)
  const setErrorApiMessage = useUisStore(state => state.setErrorMessage)

  return useMutation(
    async (data: IEmployee) => updateEmployee(_id, data),
    {
      onSuccess: async ({ hasError, message }) => {
        if (hasError) {

          setErrorApiMessage(true, message!)
          setTimeout(() => setErrorApiMessage(false), 3000);
          return;
        }
        queryClient.invalidateQueries(["employees"])
        router.push('/admin/users')
        setTimeout(() => setAlert(true, "Usuario actualizado correctamente"), 500);
      },
    }
  )
}

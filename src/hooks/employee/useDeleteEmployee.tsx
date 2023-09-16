import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store/ui";

import { deleteEmployee } from "@/api/employee/employee";
import { useEmployees } from ".";

const useDeleteEmployee = () => {

  const queryClient = useQueryClient()
  
  const setAlert = useUisStore(state => state.setAlert)
  const setErrorApiMessage = useUisStore(state => state.setErrorMessage)  
  const setShowModal = useUisStore(state => state.setShowModal);
  // const {page} =useEmployees()

  return useMutation(
    async (id: string) =>deleteEmployee(id),
    {
      onSuccess({hasError, message}) {
        if (hasError) {
          setErrorApiMessage(true, message!)
          setTimeout(() => setErrorApiMessage(false), 3000);
          return;
        }
        queryClient.invalidateQueries(["employees"])
        setShowModal(false)
        
        setAlert(true, "Usuario eliminado correctamente")
      }
    }
  )
}

export default useDeleteEmployee
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore } from "@/store";

import { apiEmployee } from "@/api/";

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  const setAlert = useUisStore((state) => state.setAlert);
  const setShowModal = useUisStore((state) => state.setShowModal);

  const deleteEmployee = useMutation({
    mutationFn: (id: string) => apiEmployee.deleteEmployee(id),

    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      setShowModal(false);
      setAlert("success", true, "Usuario eliminado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  return deleteEmployee;
}

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DeleteEmployee } from "../../interfaces/tanstak-query.employees";

export function useMutationDeleteEmployee({
  useUIStore,
  deleteEmployee,
}: DeleteEmployee) {
  const queryClient = useQueryClient();

  const setAlert = useUIStore((state) => state.setAlert);
  const setShowModal = useUIStore((state) => state.setShowModal);

  return useMutation({
    mutationFn: (id: string) => deleteEmployee(id),

    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      setShowModal(false);
      setAlert("success", true, "Usuario eliminado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });
}

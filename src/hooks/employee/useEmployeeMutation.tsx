import { useRouter } from "next/router";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUisStore, useFormStore, useEmployeesStore } from "@/store";

import { apiEmployee, userAuth } from "@/api/";
import { IEmployee } from "@/types";

interface UpdateEmployee {
  _id: string
  employee:IEmployee
}

export const useEmployeeMutation = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const userAdmin = useEmployeesStore((state) => state.session?.username);
  const adminRole = useEmployeesStore((state) => state.session?.role);
  const setAlert = useUisStore((state) => state.setAlert);
  const setShowModal = useUisStore((state) => state.setShowModal);
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  const createEmployeeMutation = useMutation({
    mutationFn: (data: IEmployee) =>
      userAuth.registerUser(data, { adminRole, userAdmin }, false),
    onSuccess: async (employee) => {
      queryClient.setQueriesData(["credential-employee"], employee);
      queryClient.invalidateQueries(["employees"]);
      handleResetForm({});
      router.push("/admin/users");
      setAlert("success", true, "Usuario Creado con éxito");
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  const updateEmployeeMutation =  useMutation({
    mutationFn: ({_id, employee}: UpdateEmployee) => apiEmployee.updateEmployee(_id, employee),
    onSuccess: () => {
      queryClient.invalidateQueries(["employees"]);
      router.push("/admin/users");
      handleResetForm({});
      setTimeout(
        () => setAlert("success", true, "Usuario actualizado con éxito"),
        500
      );
    },
    onError: (error: any) => {
      setAlert("error", true, error.message);
    },
  });

  const deleteEmployeeMutation = useMutation({
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

  return {
    createEmployeeMutation,
    updateEmployeeMutation,
    deleteEmployeeMutation,
  };
};

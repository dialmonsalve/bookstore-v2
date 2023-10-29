import { useState } from "react";
import { useRouter } from "next/router";

import { useUIStore } from "@/stores/ui/ui.store";
import {
  useGetAllEmployees,
  useDeleteEmployee,
} from "@/plugins/dependencies/employeeDependency";

const titles = ["Nombre", "Apellido", "Username", "Email", "Teléfono", "Role"];

const nameTableFields = [
  "name",
  "lastName",
  "username",
  "email",
  "phone",
  "role",
];

export const useMainEmployees = () => {
  const [employeeId, setEmployeeId] = useState("");
  const router = useRouter();
  const employeeGetAll = useGetAllEmployees();
  const employeeDelete = useDeleteEmployee();
  const setShowModal = useUIStore((state) => state.setShowModal);

  //! Handler functions
  const handleEditEmployee = (employeeId: string | number): void => {
    router.push(`/admin/users/${employeeId}`);
  };

  const handleDeleteEmployee = (
    employeeId: string | number,
    employeeUsername?: string | number
  ): void => {
    setShowModal(true, `¿Desea eliminar el usuario ${employeeUsername}?`);
    setEmployeeId(`${employeeId}`);
  };

  const handleAcceptAction = () => {
    setShowModal(false);
    employeeDelete.delete(employeeId);
  };

  return {
    employeeDelete,
    employeeId,
    employeeGetAll,
    nameTableFields,
    router,
    titles,
    handleAcceptAction,
    handleDeleteEmployee,
    handleEditEmployee,
    setEmployeeId,
    setShowModal,
  };
};

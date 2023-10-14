import { useState } from "react";
import { useRouter } from "next/router";

import { useUisStore } from "@/store/ui";
import { useEmployeeQuery, useDeleteEmployee } from "@/hooks/employee";

const titles = ["Nombre", "Apellido", "Username", "email", "Teléfono", "Role"];

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
  const deleteEmployee = useDeleteEmployee();
  const setShowModal = useUisStore((state) => state.setShowModal);
  const getEmployees = useEmployeeQuery();

  return {
    deleteEmployee,
    employeeId,
    getEmployees,
    nameTableFields,
    router,
    titles,
    setEmployeeId,
    setShowModal,
  };
};

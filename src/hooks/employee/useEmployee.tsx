import { useQuery } from "@tanstack/react-query";

import { useEmployeesStore } from "@/store";

import { apiEmployee } from "@/api";

export const useEmployee = (employeeId?: string) => {
  const setEmployee = useEmployeesStore((state) => state.setEmployee);

  const getEmployeeById = useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      if (!employeeId) return;
      const data = await apiEmployee.getEmployeeById(employeeId);
      setEmployee(data);
      return data;
    },
  });

  return getEmployeeById
  
};

import { useQuery } from "@tanstack/react-query";

import { useEmployeesStore } from "@/store/employee";

import { apiEmployee } from "@/api";
import { IEmployee } from "@/types";

export function useEmployee(employeeId: string, employee: IEmployee) {
  const setEmployee = useEmployeesStore((state) => state.setEmployee);

  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      const data = await apiEmployee.getEmployeeById(employeeId);
      setEmployee(data);
      return data;
    },
  });
}

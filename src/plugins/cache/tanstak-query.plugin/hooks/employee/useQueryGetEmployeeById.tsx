import { useQuery } from "@tanstack/react-query";

import { useEmployeesStore } from "@/stores";

import { GetEmployeeById } from "../../interfaces/tanstak-query.employees";

export const useQueryGetEmployeeById = (actionEmployee: GetEmployeeById) => {
  const setEmployee = useEmployeesStore((state) => state.setEmployee);

  const { employeeId, getEmployeeById } = actionEmployee;

  if (!employeeId) return;

  return useQuery({
    queryKey: ["employee", employeeId],
    queryFn: async () => {
      const data = await getEmployeeById(employeeId);
      setEmployee(data);
      return data;
    },
  });
};

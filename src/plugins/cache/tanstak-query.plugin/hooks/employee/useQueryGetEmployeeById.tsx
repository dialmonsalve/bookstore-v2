import { useQuery } from "@tanstack/react-query";

import { GetEmployeeById } from "@/plugins/interfaces";

export const useQueryGetEmployeeById = (actionEmployee: GetEmployeeById) => {
  const { employeeId, getEmployeeById, useEmployeesStore } = actionEmployee;

  const setEmployee = useEmployeesStore((state) => state.setEmployee);

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

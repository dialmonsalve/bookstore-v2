import { useQuery } from "@tanstack/react-query";

import { GetEmployees } from "../../interfaces/tanstak-query.employees";

export function useQueryGetEmployees(ActionEmployees: GetEmployees) {
  const { getEmployees, useEmployeesStore, useUIStore } = ActionEmployees;
  const setEmployees = useEmployeesStore((state) => state.setEmployees);

  const page = useUIStore((state) => state.page);

  return useQuery({
    queryKey: ["employees", { page }],
    queryFn: async () => {
      const data = await getEmployees(page);
      setEmployees(data?.employees!);

      return data;
    },
    staleTime: Infinity,
  });
}

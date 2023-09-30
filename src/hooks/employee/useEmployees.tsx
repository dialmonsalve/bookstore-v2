import { useQuery } from "@tanstack/react-query";

import { useUisStore, useEmployeesStore } from "@/store";

import { apiEmployee } from "@/api";

export function useEmployees() {
  const setEmployees = useEmployeesStore((state) => state.setEmployees);

  const page = useUisStore((state) => state.page);

  const queryEmployees = useQuery({
    queryKey: ["employees", { page }],
    queryFn: async () => {
      const data = await apiEmployee.getEmployees(page);
      setEmployees(data?.employees!);

      return data;
    },
    staleTime: Infinity,
    // initialData: employees,
  });

  return queryEmployees;
}

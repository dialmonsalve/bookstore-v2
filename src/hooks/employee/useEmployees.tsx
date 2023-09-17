import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "@/api/employee/employee";
import { useEmployeesStore } from "@/store/employee";

import { useUisStore } from "@/store/ui";

export function useEmployees() {

  const setEmployees = useEmployeesStore(state => state.setEmployees);

  const page = useUisStore(state => state.page)

  const queryEmployees = useQuery(
    ["employees", { page }],
    async () => {
      const data = await getEmployees(page)
      setEmployees(data?.employees!)
  
      return data
    }
    , {
      staleTime: Infinity,
      // initialData: employees,  
    }
  )

  return queryEmployees



}
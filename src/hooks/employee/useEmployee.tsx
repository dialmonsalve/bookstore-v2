import { useQuery } from "@tanstack/react-query";

import { useEmployeesStore } from "@/store/employee";

import { getEmployeeById } from "@/api/employee/employee";
import { IEmployee } from "@/types";

export function useEmployee(employeeId: string, employee: IEmployee) {

  const setEmployee = useEmployeesStore(state => state.setEmployee)
  

  return useQuery(
    ["employee", employeeId],
    async () => {
      const data = await  getEmployeeById(employeeId)
      setEmployee(data)
      return data
    },
    {
      initialData: employee,
    }
  )
}



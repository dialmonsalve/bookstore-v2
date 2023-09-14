import { getEmployeeById, getEmployees } from "@/api/employee";
import { useEmployeesStore } from "@/store/employee";
import { IEmployee } from "@/types";
import { useQuery } from "@tanstack/react-query";

export function useEmployee(employeeId:string, employee:IEmployee) {

  const setEmployee = useEmployeesStore(state=>state.setEmployee)
  setEmployee(employee)

  return useQuery(
    ["employee", employeeId],
    ()=>getEmployeeById(employeeId),
    {
      initialData:employee,
      staleTime: Infinity,
    }
  )
}

export default function useEmployees(employees:IEmployee[]) {

  const setEmployees = useEmployeesStore(state=>state.setEmployees)
  setEmployees(employees)

  return useQuery(
    ["employees"],
     getEmployees
    ,{
      staleTime: Infinity,
      initialData:employees
    }
  )

}



import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { getEmployees } from "@/api/employee/employee";
import { useEmployeesStore } from "@/store/employee";

import { IEmployee } from "@/types";
import { useRouter } from "next/router";

export function useEmployees(employees:IEmployee[]) {

  const setEmployees = useEmployeesStore(state => state.setEmployees);
  const [page, setPage] = useState<number>(1)

  const router = useRouter()

  const queryEmployees = useQuery(
    ["employees", { page }],
    async () => {
      const data = await getEmployees(page)
      setEmployees(data)
      return data
    }
    , {
      staleTime: Infinity,
      initialData: employees,  
      enabled:!!page    
    }
  )

  const nextPage = () => {
    if (queryEmployees.data?.length === 0) return;
    setPage(page +1)
    router.push(`/admin/users/?page=${page}&limit=2`)

  }

  const prevPage = () => {
    if (page > 1) setPage(page - 1);
    router.push(`/admin/users/?page=${page}&limit=2`)
  }



  return {
    queryEmployees,
    page: queryEmployees.isFetching ? 'loading' : page,
    nextPage,
    prevPage
  }

}
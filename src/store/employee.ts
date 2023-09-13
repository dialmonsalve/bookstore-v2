
import {  IEmployee } from "@/types"
import { create, } from "zustand"
import { devtools } from "zustand/middleware"

interface State {
  employees: IEmployee[] | null;
  employee: IEmployee | null;
  session: IEmployee | null;
}

interface Actions {
  setSession: (session: IEmployee | null) => void
  setEmployees: (employees: IEmployee[] | null) => void
}

export const useEmployeesStore = create<State & Actions>()(devtools((set, get) => {

  return {
    employees: [],
    employee: {} as IEmployee,
    session: {} as IEmployee,

    setSession(newSession: IEmployee | null) {
      set({ session: newSession }, false, "session")
    },
    setEmployees(newEmployees: IEmployee[] | null) {
      set({ employees: newEmployees }, false, "employees")
    },
  }
}))
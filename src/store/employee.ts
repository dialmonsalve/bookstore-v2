
import { create, } from "zustand"
import { devtools } from "zustand/middleware"
import { IEmployee } from "@/types"

interface State {
  employees: IEmployee[] | null;
  employee: IEmployee | null;
  session: IEmployee | null;
}

interface Actions {
  setSession: (session: IEmployee | null) => void
  setEmployees: (employees: IEmployee[] | null) => void
  setEmployee: (employee: IEmployee | null) => void
}

export const useEmployeesStore = create<State & Actions>()(devtools((set, get) => {

  return {
    employees: [],
    employee: {} as IEmployee,
    session: {} as IEmployee,
    setEmployee(newEmployee) {
      set({ employee:newEmployee }, false, "employee")
    },
    setEmployees(newEmployees) {
      set({ employees:newEmployees }, false, "employees")
    },
    setSession(newSession: IEmployee | null) {
      set({ session: newSession }, false, "session")
    },
  }
}))
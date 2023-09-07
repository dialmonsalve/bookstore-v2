
import { IStaff } from "@/types"
import { create, } from "zustand"
import { devtools } from "zustand/middleware"

export interface InitialState {
  employees: IStaff[] | null | undefined;
  employee: IStaff;
  session: IStaff | null | undefined;
  setEmployees: (employees: IStaff[] | null | undefined) => void
  setSession: (session: IStaff | null | undefined) => void
}

export const useEmployeesStore = create<InitialState>()(devtools((set, get) => {

  return {
    employees: [],
    employee: {} as IStaff,
    session: {} as IStaff,
    setEmployees: (employees: IStaff[] | null | undefined) => {
      set({ employees }, false, "employees")
    },
    setSession: (session: IStaff | null | undefined) => {
      set({session})
    }
  }
}))
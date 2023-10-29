import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";
import { IEmployee } from "@/types";
import { EmployeeState, EmployeeActions } from "../interfaces.store";


const storeEmployee: StateCreator<
  EmployeeState & EmployeeActions,
  [["zustand/devtools", unknown]]
> = (set) => ({
  employees: [],
  employee: {} as IEmployee,
  session: {} as IEmployee,
  setEmployees: (newEmployees) => {
    set({ employees: newEmployees }, false, "employees");
  },
  setEmployee: (newEmployee) => {
    set({ employee: newEmployee }, false, "employee");
  },
  setSession: (newSession) => {
    set({ session: newSession }, false, "session");
  },
  setDeleteEmployee: (id) => {
    set(
      (state) => ({
        employees: state.employees?.filter((employee) => {
          console.log(employee._id === id);
          return employee._id !== id;
        }),
      }),
      false,
      "employees"
    );
  },
});

export const useEmployeesStore = create<EmployeeState & EmployeeActions>()(
  devtools(storeEmployee, { name: "Employees" })
);

import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { IEmployee } from "@/types";

interface State {
  employees: IEmployee[] | null;
  employee: IEmployee | null;
  session: IEmployee | null;
}

interface Actions {
  setSession: (session: IEmployee | null) => void;
  setEmployees: (employees: IEmployee[] | null) => void;
  setEmployee: (employee: IEmployee | null) => void;
  setDeleteEmployee: (id: string) => void;
}
const EMPLOYEE_INITIAL_STATE: State = {
  employees: [],
  employee: {} as IEmployee,
  session: {} as IEmployee,
};

export const useEmployeesStore = create<State & Actions>()(
  devtools(
    (set, get) => {
      return {
        ...EMPLOYEE_INITIAL_STATE,
        setEmployees(newEmployees) {
          set({ employees: newEmployees }, false, "employees");
        },
        setEmployee(newEmployee) {
          set({ employee: newEmployee }, false, "employee");
        },
        setSession(newSession: IEmployee | null) {
          set({ session: newSession }, false, "session");
        },
        setDeleteEmployee(id) {
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
      };
    },
    { name: "Employees" }
  )
);

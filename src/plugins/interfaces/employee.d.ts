import { EmployeesStore, UIStore, FormStore, Admin } from ".";
import { IClient, IEmployee, TypeRole } from "@/types";
import { NextRouter } from "next/router";

export interface GetEmployees {
  useEmployeesStore: EmployeesStore;
  useUIStore: UIStore;
  getEmployees: (page: number) => Promise<DataEmployee | null>;
}

export interface GetEmployeeById {
  employeeId?: string;
  getEmployeeById: (id: string) => Promise<IEmployee | null>;
  useEmployeesStore: EmployeesStore;
}

export interface CreateEmployee {
  useRouter(): NextRouter;
  useFormStore: FormStore;
  useEmployeesStore: EmployeesStore;
  useUIStore: UIStore;
  registerUser: (
    employee: IEmployee | IClient,
    admin: Admin | null,
    isClient: boolean
  ) => Promise<IEmployee | IClient | null>;
}

export interface DeleteEmployee {
  useUIStore: UIStore;
  deleteEmployee: (id: string) => Promise<IEmployee | null>;
}

export interface UpdateEmployee {
  updateEmployee: (_id: string, employee: IEmployee) => Promise<IEmployee>;
  useRouter(): NextRouter;
  useUIStore: UIStore;
  useFormStore: FormStore;
}
interface DataEmployee {
  employees: IEmployee[] | null;
  totalEmployees: number;
}

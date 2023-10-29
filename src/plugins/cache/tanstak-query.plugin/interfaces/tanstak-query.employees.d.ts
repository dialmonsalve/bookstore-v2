import {
  AlertSlice,
  EmployeeActions,
  EmployeeState,
  FormActions,
  FormState,
  ModalSlice,
  PaginatorSlice,
} from "@/stores/interfaces.store";
import { IClient, IEmployee, TypeRole } from "@/types";
import { NextRouter } from "next/router";

export interface GetEmployees {
  useEmployeesStore: EmployeesStore;
  useUIStore: UIStore;
  getEmployees: (page: number) => Promise<Data | null>;
}

export interface GetEmployeeById {
  employeeId?: string;
  getEmployeeById: (id: string) => Promise<IEmployee | null>;
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
interface Data {
  employees: IEmployee[] | null;
  totalEmployees: number;
}

interface EmployeesStore {
  <T>(selector: (state: EmployeeState & EmployeeActions) => T): T;
}
export interface UIStore {
  <T>(selector: (state: AlertSlice & ModalSlice & PaginatorSlice) => T): T;
}
interface FormStore {
  <T>(selector: (state: FormState<any> & FormActions) => T): T;
}

interface Admin {
  adminRole: TypeRole[] | undefined;
  userAdmin: string | undefined;
}

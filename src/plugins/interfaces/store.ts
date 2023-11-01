import {
  AlertSlice,
  BookActions,
  BookState,
  EmployeeActions,
  EmployeeState,
  FormActions,
  FormState,
  ModalSlice,
  PaginatorSlice,
} from "@/stores/interfaces.store";

export interface BookStore {
  <T>(selector: (state: BookState & BookActions) => T): T;
}
export interface UIStore {
  <T>(selector: (state: AlertSlice & ModalSlice & PaginatorSlice) => T): T;
}
export interface FormStore {
  <T>(selector: (state: FormState<any> & FormActions) => T): T;
}

export interface EmployeesStore {
  <T>(selector: (state: EmployeeState & EmployeeActions) => T): T;
}

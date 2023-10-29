import { ErrorMessages, ReactFocusEvent } from "@/types";

//! Form Store
export interface FormState<T> {
  formState: T;
  isTouched: T | null;
  isFormSubmitted: boolean;
  options: string[] | string;
  optionTags: string[] | string;
}

export interface FormActions {
  setFormState: (formState: Record<string, any>) => void;
  handleResetForm: (initialState?: Record<string, any>) => void;
  handleBlur: (e: ReactFocusEvent) => void;
  checkFormErrors: (
    errors: ErrorMessages<Record<string, any> | undefined>
  ) => boolean;
  setOption: (name: string, option?: string[] | string) => void;
  setOptionTags: (name: string, optionTags?: string[] | string) => void;
}

export interface FormOptions {
  _id: number;
  name: string;
  type: string;
  label: string;
  select?: string | string[];
}


//! Books
export interface BookState {
  books: IBook[] | null;
  foundBooks: FoundBooks[] | null;
  book: IBook | null | undefined;
  categories: string[] | null;
}

export interface BookActions {
  setAllBooks: (books: IBook[] | null) => void;
  setAllCategories: (categories: ICategory[] | null) => void;
  setBookByISBN: (foundBook: IBook | null | undefined) => void;
  setNewBook: (book: IBook | null | undefined) => void;
  setFoundBooks: (foundBook: FoundBooks[] | undefined | null) => void;
}

//! Employees
export interface EmployeeState {
  employees: IEmployee[] | null;
  employee: IEmployee | null;
  session: IEmployee | null;
}

export interface EmployeeActions {
  setSession: (session: IEmployee | null) => void;
  setEmployees: (employees: IEmployee[] | null) => void;
  setEmployee: (employee: IEmployee | null) => void;
  setDeleteEmployee: (id: string) => void;
}

//! UI
export interface AlertSlice {
  alertType: TypeAlert;
  showAlert: boolean;
  alertMessage: string | null;
  setAlert: (
    alertType: TypeAlert,
    showAlert: boolean,
    alertMessage?: string | null
  ) => void;
}

type TypeAlert = "" | "success" | "error";

export interface ModalSlice {
  messageModal: string | null;
  showModal: boolean;
  setShowModal: (showModal: boolean, messageModal?: string | null) => void;
}

export interface PaginatorSlice {
  page: number;
  nextPage: () => void;
  prevPage: () => void;
  resetPage: () => void;
}

export interface SidebarSlice {
  toggleSidebar: boolean;
  setToggleSidebar: () => void;
}

export interface TableItemsSlice<T> {
  formItems: T[];
  disabled: boolean;
  addItem: (newFormState: Record<string, any>) => void;
  removeItem: (itemToRemove: number | string) => void;
  clearItems: () => void;
}
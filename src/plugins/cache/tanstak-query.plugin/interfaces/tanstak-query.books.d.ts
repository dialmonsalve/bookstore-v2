import {
  AlertSlice,
  BookActions,
  BookState,
  FormActions,
  FormState,
  ModalSlice,
  PaginatorSlice,
} from "@/stores/interfaces.store";
import { FoundBooks, IBook, ICategory, TypeRole } from "@/types";
import { NextRouter } from "next/router";

export interface GetBooks {
  useBooksStore: BookStore;
  useUIStore: UIStore;
  getBooks: (page: number) => Promise<Data | null>;
}

export interface GetBookByISBN {
  useBooksStore: BookStore;
  useUIStore: UIStore;
  getBookByISBN: (isbn: string) => Promise<IBook | null>;
}

export interface CreateBook {
  useRouter(): NextRouter;
  useFormStore: FormStore;
  useBooksStore: BookStore;
  useUIStore: UIStore;
  createBook: (book: IBook, username: string) => Promise<IBook | null>;
}

export interface SearchBook {
  getSearchBooks: (term: string) => Promise<FoundBooks[] | undefined | null>;
  useUIStore: UIStore;
  useBooksStore: BookStore;
}

export interface DeleteBook {
  //! No implementado
  useUIStore: UIStore;
  deleteBook: (id: string) => Promise<IBook | null>;
}

export interface UpdateBook {
  //! No implementado
  updateBook: (_id: string, Book: IBook) => Promise<IBook>;
  useRouter(): NextRouter;
  useUIStore: UIStore;
  useFormStore: FormStore;
}

export interface GetCategoriesBook {
  useBooksStore: BookStore;
  getCategories: () => Promise<ICategory[] | null>;
}

export interface CreateCategory {
  useUIStore: UIStore;
  createCategory: (
    name: string,
    username?: string
  ) => Promise<ICategory | null>;
}
interface Data {
  books: IBook[] | null;
  totalBooks: number;
}

interface BookStore {
  <T>(selector: (state: BookState & BookActions) => T): T;
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

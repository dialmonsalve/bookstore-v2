import { NextRouter } from "next/router";

import { IBook, ICategory } from "@/types";
import { FoundBooks } from "@/plugins/interfaces/googleBooks";
import { BookStore, UIStore, FormStore } from ".";

export interface GetBooks {
  useBooksStore: BookStore;
  useUIStore: UIStore;
  getBooks: (page: number) => Promise<DataBooks | null>;
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
export interface DataBooks {
  books: IBook[] | null;
  totalBooks: number;
}

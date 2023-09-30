import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IBook, ICategory, FoundBooks } from "@/types";

interface State {
  books: IBook[] | null;
  foundBooks: FoundBooks[] | null;
  selectedBook: IBook | null;
  categories: string[] |  null;
}

interface Actions {
  setBooks: (books: IBook[] | null) => void;
  setBook: (book: IBook | null | undefined) => void;
  setDeleteBook: (id: string) => void;
  setFoundBooks: (foundBooks: FoundBooks[] | undefined | null) => void;
  setCategories: (categories: ICategory[]  | null) => void;
}

const BOOK_INITIAL_STATE: State = {
  books: [],
  foundBooks: [],
  selectedBook: {} as IBook,
  categories: [],
};

export const useBooksStore = create<State & Actions>()(
  devtools(
    (set, get) => {
      return {
        ...BOOK_INITIAL_STATE,
        setBooks(newBooks) {
          set({ books: newBooks }, false, "books");
        },
        setBook(selectedBook) {
          set({ selectedBook }, false, "selectedBook");
        },
        setDeleteBook(id) {
          set(
            (state) => ({
              books: state.books?.filter((book) => {
                return book._id !== id;
              }),
            }),
            false,
            "books"
          );
        },
        setFoundBooks(foundBooks) {
          set({ foundBooks }, false, "foundBook");
        },
        setCategories(categories) {
          set({categories:categories?.map(category=>category.name)},  false, "categories")
        }
      };
    },
    { name: "Books" }
  )
);

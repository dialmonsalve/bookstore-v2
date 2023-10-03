import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { IBook, ICategory, FoundBooks } from "@/types";

interface State {
  books: IBook[] | null;
  foundBooks: FoundBooks[] | null;
  book: IBook | null | undefined;
  categories: string[] | null;
}

interface Actions {
  setAllBooks: (books: IBook[] | null) => void;
  setAllCategories: (categories: ICategory[] | null) => void;
  setBookByISBN: (foundBook: IBook | null | undefined) => void;
  setNewBook: (book: IBook | null | undefined) => void;
  setFoundBooks: (foundBook: FoundBooks[] | undefined | null) => void;
}

const BOOK_INITIAL_STATE: State = {
  books: [],
  foundBooks: [],
  categories: [],
  book: {} as IBook,
};

export const useBooksStore = create<State & Actions>()(
  devtools(
    (set, get) => {
      return {
        ...BOOK_INITIAL_STATE,
        setAllBooks(books) {
          set({ books }, false, "books");
        },
        setNewBook(book) {
          set({ book }, false, "newBook");
        },
        setBookByISBN(foundBook) {
          set({ book: foundBook }, false, "bookByISBN");
        },
        // setDeleteBook(id) {
        //   set(
        //     (state) => ({
        //       books: state.books?.filter((book) => {
        //         return book._id !== id;
        //       }),
        //     }),
        //     false,
        //     "books"
        //   );
        // },
        setFoundBooks(foundBooks) {
          set({ foundBooks }, false, "foundBook");
        },
        setAllCategories(categories) {
          set(
            { categories: categories?.map((category) => category.name) },
            false,
            "categories"
          );
        },
      };
    },
    { name: "Books" }
  )
);

import { create, type StateCreator } from "zustand";
import { devtools } from "zustand/middleware";

import { IBook } from "@/types";
import { BookState, BookActions } from "../interfaces.store";

const storeBook: StateCreator<
  BookState & BookActions,
  [["zustand/devtools", unknown]]
> = (set) => ({
  books: [],
  foundBooks: [],
  categories: [],
  book: {} as IBook,
  setAllBooks: (books) => {
    set({ books }, false, "books");
  },
  setNewBook: (book) => {
    set({ book }, false, "newBook");
  },
  setBookByISBN: (foundBook) => {
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
  setFoundBooks: (foundBooks) => {
    set({ foundBooks }, false, "foundBook");
  },
  setAllCategories: (categories) => {
    set(
      { categories: categories?.map((category) => category.name) },
      false,
      "categories"
    );
  },
});

export const useBooksStore = create<BookState & BookActions>()(
  devtools(storeBook, { name: "Books" })
);

import { IBook, ICategory } from "@/types";
import { FoundBooks } from "@/types/googleBooks";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface State {
  books: IBook[] | null;
  findBooks: FoundBooks[] | null;
  selectedBook: IBook | null;
  categories: string[] |  null;
}

interface Actions {
  setBooks: (books: IBook[] | null) => void;
  setBook: (book: IBook | null | undefined) => void;
  setDeleteBook: (id: string) => void;
  setFindBooks: (findBooks: FoundBooks[] | undefined | null) => void;
  setCategories: (categories: ICategory[]  | null) => void;
}

const BOOK_INITIAL_STATE: State = {
  books: [],
  findBooks: [],
  selectedBook: {} as IBook,
  categories: [],
};

export const useBooksStore = create<State & Actions>()(
  devtools(
    (set, get) => {
      return {
        ...BOOK_INITIAL_STATE,
        setBook(selectedBook) {
          set({ selectedBook }, false, "selectedBook");
        },
        setBooks(newBooks) {
          set({ books: newBooks }, false, "books");
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
        setFindBooks(findBooks) {
          set({ findBooks }, false, "findBooks");
        },
        setCategories(categories) {
          set({categories:categories?.map(category=>category.name)},  false, "categories")
        }
      };
    },
    { name: "Books" }
  )
);

import { IBook } from "@/types";
import { FoundBooks } from "@/types/book";
import { create } from "zustand";
import { devtools } from "zustand/middleware"

interface State {
  books: IBook[] | null;
  findBooks: FoundBooks[] | null;
  selectedBook: IBook | null;
}

interface Actions {
  setBooks: (books: IBook[] | null) => void
  setBook: (book: IBook | null | undefined) => void
  setDeleteBook: (id: string) => void
  setFindBooks: (findBooks: FoundBooks[] | undefined | null) => void
}

const BOOK_INITIAL_STATE:State = {
  books: [],
  findBooks: [],
  selectedBook: {} as IBook,
}

export const useBooksStore = create<State & Actions>()(devtools((set, get) => {

  return {
    ...BOOK_INITIAL_STATE,
    setBook(selectedBook) {
      set({ selectedBook }, false, "selectedBook")
    },
    setBooks(newBooks) {
      set({ books: newBooks }, false, "books")
    },
    setDeleteBook(id) {
      set((state) => ({
        books: state.books?.filter(book => {
          return book._id !== id
        })
      }), false, "books")
    },
    setFindBooks(findBooks) {
      set({ findBooks }, false, "findBooks")
    },
  }
}, { name: "Books" }))
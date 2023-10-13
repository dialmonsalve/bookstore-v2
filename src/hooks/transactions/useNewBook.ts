import {
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUisStore,
} from "@/store";

import { useBookQuery, useCategoriesQuery, useCreateBook, useSearchBook } from "../books";
import { IBook } from "@/types";

export const useNewBook = () => {
  const createBook = useCreateBook()
  const searchBook = useSearchBook()
  const getCategoriesQuery = useCategoriesQuery()
  const getBooksQuery = useBookQuery()
  const foundBooks = useBooksStore((state) => state.foundBooks);
  const formState = useFormStore<IBook>((state) => state.formState);
  const session = useEmployeesStore((state) => state.session);
  const showModal = useUisStore((state) => state.showModal);
  const setShowModal = useUisStore((state) => state.setShowModal);

  return {
    createBook,
    formState,
    foundBooks,
    getBooksQuery,
    getCategoriesQuery,
    searchBook,
    session,
    showModal,
    setShowModal,
  };
};

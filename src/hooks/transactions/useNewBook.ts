import {
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUisStore,
} from "@/store";

import { useBookMutation, useBookQuery } from "../books";
import { IBook } from "@/types";

export const useNewBook = () => {
  const { createBookMutation, searchBookMutation } = useBookMutation();
  const { getCategoriesQuery, getBooksQuery } = useBookQuery();
  const foundBooks = useBooksStore((state) => state.foundBooks);
  const formState = useFormStore<IBook>((state) => state.formState);
  const session = useEmployeesStore((state) => state.session);
  const showModal = useUisStore((state) => state.showModal);
  const setShowModal = useUisStore((state) => state.setShowModal);

  return {
    createBookMutation,
    formState,
    foundBooks,
    getBooksQuery,
    getCategoriesQuery,
    searchBookMutation,
    session,
    showModal,
    setShowModal,
  };
};

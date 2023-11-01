import {
  useCreateBook,
  useGetSearchBooks,
  useGetCategories,
  useGetBooks,
} from "@/plugins/dependencies/bookDependency";
import {
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUIStore,
} from "@/stores";

import { IBook } from "@/types";

export const useNewBook = () => {
  const createBook = useCreateBook();
  const searchBook = useGetSearchBooks();
  const getCategoriesQuery = useGetCategories();
  const getBooksQuery = useGetBooks();
  const foundBooks = useBooksStore((state) => state.foundBooks);
  const formState = useFormStore<IBook>((state) => state.formState);
  const session = useEmployeesStore((state) => state.session);
  const showModal = useUIStore((state) => state.showModal);
  const setShowModal = useUIStore((state) => state.setShowModal);

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

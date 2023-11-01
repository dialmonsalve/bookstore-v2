import { useFormStore, useUIStore, useBooksStore } from "@/stores";
import { useBookOperations } from "../cache/tanstak-query.plugin/entities/useBookOperations";

import { useRouter } from "next/router";
import { httpBookPlugin } from "../http/axios.plugin/entities/httpBookPlugin";
import { httpBookCategoryPlugin } from "../http/axios.plugin/entities/httpBookCategoryPlugin";
import { httpGoogleBooksPlugin } from "../http/axios.plugin/entities/httpGoogleBooksPlugin";

export const useCreateBook = () =>
  useBookOperations().mutationCreateBook({
    useUIStore,
    useFormStore,
    useBooksStore,
    useRouter,
    createBook: httpBookPlugin().create,
  });

export const useGetBooks = () =>
  useBookOperations().queryGetAllBooks({
    useUIStore,
    useBooksStore,
    getBooks: httpBookPlugin().get,
  });

// mutationCreateCategoryBook,

export const useGetBookByISBN = () =>
  useBookOperations().queryGetBookById({
    useUIStore,
    useBooksStore,
    getBookByISBN: httpBookPlugin().getByISBN,
  });

export const useGetSearchBooks = () =>
  useBookOperations().mutationSearchBook({
    useBooksStore,
    useUIStore,
    getSearchBooks: httpGoogleBooksPlugin(),
  });

export const useGetCategories = () =>
  useBookOperations().queryGetCategoriesBook({
    useBooksStore,
    getCategories: httpBookCategoryPlugin().get,
  });

export const useCreateCategory = () =>
  useBookOperations().mutationCreateCategoryBook({
    useUIStore,
    createCategory: httpBookCategoryPlugin().create,
  });

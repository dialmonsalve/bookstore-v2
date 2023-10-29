import { useFormStore, useUIStore, useBooksStore } from "@/stores";
import { useBookOperations } from "../cache/tanstak-query.plugin/entities/useBookOperations";

import { apiBook } from "@/api";
import { useRouter } from "next/router";

export const useCreateBook = () =>
  useBookOperations().mutationCreateBook({
    useUIStore,
    useFormStore,
    useBooksStore,
    useRouter,
    createBook: apiBook.createBook,
  });

export const useGetBooks = () =>
  useBookOperations().queryGetAllBooks({
    useUIStore,
    useBooksStore,
    getBooks: apiBook.getBooks,
  });

// mutationCreateCategoryBook,

export const useGetBookByISBN = () =>
  useBookOperations().queryGetBookById({
    useUIStore,
    useBooksStore,
    getBookByISBN: apiBook.getBookByISBN,
  });

export const useGetSearchBooks = () =>
  useBookOperations().mutationSearchBook({
    useBooksStore,
    useUIStore,
    getSearchBooks: apiBook.getSearchBooks,
  });

export const useGetCategories = () =>
  useBookOperations().queryGetCategoriesBook({
    useBooksStore,
    getCategories: apiBook.getCategories,
  });

export const useCreateCategory = () =>
  useBookOperations().mutationCreateCategoryBook({
    useUIStore,
    createCategory: apiBook.createCategory,
  });

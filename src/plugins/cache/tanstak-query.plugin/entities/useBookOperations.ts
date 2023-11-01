import {
  useMutationCreateBook,
  useMutationGetBookByISBN,
  useQueryGetBooks,
  useQueryGetCategoriesBook,
  useMutationCreateCategoryBook,
  useMutationSearchBook,
} from "../hooks/books";

import {
  CreateBook,
  CreateCategory,
  GetBookByISBN,
  GetBooks,
  GetCategoriesBook,
  SearchBook,
} from "@/plugins/interfaces";

export const useBookOperations = () => {
  function queryGetAllBooks(ActionBooks: GetBooks) {
    const queryBooks = useQueryGetBooks(ActionBooks);

    return {
      getAll: queryBooks.data?.books,
      isLoading: queryBooks.isLoading,
      totalBooks: queryBooks.data?.totalBooks,
      isFetching: queryBooks.isFetching,
    };
  }

  function queryGetBookById(actionBook: GetBookByISBN) {
    const getBookByISBN = useMutationGetBookByISBN(actionBook);

    return {
      getByISBN: getBookByISBN?.mutate,
      isLoading: getBookByISBN?.isLoading,
    };
  }

  function mutationCreateBook(actionBook: CreateBook) {
    const createBook = useMutationCreateBook(actionBook);

    return {
      create: createBook.mutate,
      isLoading: createBook.isLoading,
    };
  }

  function mutationCreateCategoryBook(actionBook: CreateCategory) {
    const createCategoryBook = useMutationCreateCategoryBook(actionBook);

    return {
      createCategory: createCategoryBook.mutate,
      isLoading: createCategoryBook.isLoading,
    };
  }

  function queryGetCategoriesBook(actionBook: GetCategoriesBook) {
    const getCategoriesBook = useQueryGetCategoriesBook(actionBook);

    return {
      getCategories: getCategoriesBook.data,
      isLoading: getCategoriesBook.isLoading,
    };
  }

  function mutationSearchBook(actionBook: SearchBook) {
    const searchBook = useMutationSearchBook(actionBook);

    return {
      searchBook: searchBook.mutate,
      isLoading: searchBook.isLoading,
    };
  }

  return {
    queryGetAllBooks,
    queryGetBookById,
    queryGetCategoriesBook,
    mutationSearchBook,
    mutationCreateBook,
    mutationCreateCategoryBook,
  };
};

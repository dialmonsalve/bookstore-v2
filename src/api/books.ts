import { IBook, ICategory } from "@/types";
import { bookApi, searchBooksApi } from "./bookstoreApi";
import { FoundBooks, GoogleBooks } from "@/types/googleBooks";
import { URL_CONSTANTS } from "@/constants";
import axios from "axios";

interface DataBooks {
  hasError: boolean;
  books: IBook[] | null;
  message?: string;
  totalBooks: number;
}

interface DataCategories {
  hasError: boolean;
  categories: ICategory[] | null;
  message?: string;
}

interface DataCategory {
  hasError: boolean;
  category?: ICategory | null;
  message?: string;
}
interface DataBook {
  hasError: boolean;
  book?: IBook | null;
  message?: string;
}

// export const searchBooks = async (term: string) => {
//   try {
//     const { data } = await axios.get(url)
//     return data;
//   } catch (error) {
//     if (error.response && error.response.status === 429) {
//       console.log('Se alcanzó el límite de solicitudes. Esperando...')
//       await new Promise(resolve => setTimeout(resolve, 5000));
//       return searchBooks(term);
//     } else {
//       throw error;
//     }
//   }
// }

//! Get all books
export async function getBooks(page: number): Promise<DataBooks | null> {
  const params = new URLSearchParams();
  params.append("page", page?.toString());
  params.append("limit", `${URL_CONSTANTS.limit}`);

  try {
    const { data } = await bookApi.get<DataBooks>("", { params });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
  return null;
}

//! Create a book
export async function createBook(
  book: IBook,
  username: string
): Promise<DataBook> {
  if (!username) {
    return {
      hasError: true,
      message: "Usuario no autorizado para esta acción",
    };
  }

  try {
    const { data } = await bookApi.post("", { book, username });

    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.response?.data.message,
      };
    }
  }
  return {
    hasError: true,
    message: "No pudo iniciar sesión - intente nuevamente",
  };
}

//! Get all categories
export async function getCategories(): Promise<DataCategories | null> {
  try {
    const { data } = await bookApi.get<DataCategories>("/categories");
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.message);
    }
  }
  return null;
}

//! Create a category
export async function createCategory(
  name: string,
  username?: string
): Promise<DataCategory> {
  if (!username) {
    return {
      hasError: true,
      message: "Usuario no autorizado para esta acción",
    };
  }

  try {
    const { data } = await bookApi.post("/categories", { name, username });

    return {
      hasError: false,
      category: data,
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        hasError: true,
        message: error.response?.data.message,
      };
    }
  }
  return {
    hasError: true,
    message: "No pudo iniciar sesión - intente nuevamente",
  };
}

//! Search books on google books
export async function getSearchBooks(
  term: string
): Promise<FoundBooks[] | undefined | null> {
  const apiKey = process.env.NEXT_PUBLIC_API_GOOGLE_BOOK_kEY;

  const params = new URLSearchParams();

  params.append("q", term);
  params.append("key", `${apiKey}`);
  params.append("startIndex", "0");
  params.append("maxResults", `${URL_CONSTANTS.limit + 10}`);

  try {
    const { data } = await searchBooksApi.get<GoogleBooks>("/volumes", {
      params,
    });

    const { items } = data;

    const books = items.map((book) => {
      const { volumeInfo, id } = book;
      const ISBN = volumeInfo.industryIdentifiers
        ? volumeInfo.industryIdentifiers?.[0].identifier
        : "No hay ISB disponible";
      const subtitle = volumeInfo.subtitle || "No hay subtitulo disponible";
      const authors = volumeInfo.authors || "sin definir";
      const googleCategories = volumeInfo.categories || ["Sin definir"];

      const editorial = volumeInfo.publisher || "Sin definir";
      const language = volumeInfo.language || "";
      const pageCount = volumeInfo.pageCount || 0;
      const publishedDate = volumeInfo.publishedDate || "";
      const thumbnail = volumeInfo.imageLinks
        ? volumeInfo.imageLinks?.smallThumbnail
        : "/media/no-image.svg";
      const description =
        volumeInfo.description || "No hay descripción disponible";

      const newArrayBooks: FoundBooks = {
        id,
        isbn: ISBN,
        title: volumeInfo.title,
        subtitle,
        authors,
        description,
        googleCategories,
        editorial,
        language,
        pageCount,
        publishedDate,
        format: "printedBook",
        slug: "",
        imageLinks: thumbnail,
      };
      return newArrayBooks;
    });

    return books;
  } catch (error) {
    console.log(error);
  }
  return null;
}

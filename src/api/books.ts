import { IBook, ICategory } from "@/types";
import { bookApi, searchBooksApi } from "./bookstoreApi";
import { FoundBooks, GoogleBooks } from "@/types/googleBooks";
import { URL_CONSTANTS } from "@/constants";

interface DataBooks {
  books: IBook[];
  totalBooks: number;
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
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Create a book
export async function createBook(
  book: IBook,
  username: string
): Promise<IBook | null> {
  if (!username) {
    throw new Error("Usuario no autorizado para esta acción");
  }

  try {
    const { data } = await bookApi.post("", { book, username });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Get book by ISBN
export async function getBookByIsbn(isbn: string): Promise<IBook | null> {
  try {
    const { data } = await bookApi.get<IBook | null>(`/${isbn}`);
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Get all categories
export async function getCategories(): Promise<ICategory[] | null> {
  try {
    const { data } = await bookApi.get<ICategory[]>("/categories");  
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

//! Create a category
export async function createCategory(
  name: string,
  username?: string
): Promise<ICategory | null> {
  if (!username) {
    throw new Error("Usuario no autorizado para esta acción");
  }

  try {
    const { data } = await bookApi.post("/categories", { name, username });

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
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
        format: "impreso",
        slug: "",
        imageLinks: thumbnail,
      };
      return newArrayBooks;
    });

    return books;
  } catch (error: any) {
    throw new Error(error.response?.data.message);
  }
}

import axios from "axios";

import { URL_CONSTANTS } from "@/constants";
import { FoundBooks, GoogleBooks } from "../../../interfaces/googleBooks";

export const httpGoogleBooksPlugin = () => {
  const searchBooksApi = axios.create({
    baseURL: "https://www.googleapis.com/books/v1",
  });

  //! Search books on Google books
  async function searchBooks(
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
          : "";
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

  return searchBooks;
};

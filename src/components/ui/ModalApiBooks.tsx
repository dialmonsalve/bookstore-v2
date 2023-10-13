import Image from "next/image";
import { Button } from ".";

import { FoundBooks } from "@/types/googleBooks";
import { useBooksStore, useFormStore, useUisStore } from "@/store";
import { IBook } from "@/types";

interface GoogleApiBooksProps {
  googleBook: FoundBooks;
}

export const ModalApiBooks = ({ googleBook }: GoogleApiBooksProps) => {
  const setShowModal = useUisStore((state) => state.setShowModal);

  const formState = useFormStore((state) => state.formState);
  const setFormState = useFormStore((state) => state.setFormState);
  const setNewBook = useBooksStore((state) => state.setNewBook);

  const resumeDescription =
    googleBook.description.length < 500
      ? googleBook.description
      : `${googleBook.description.substring(0, 500)}...`;

  const handleInsertBook = () => {
    const slug =
      googleBook.title
        .trim()
        .replaceAll(" ", "-")
        .replaceAll("'", " ")
        .toLocaleLowerCase() || "";

    const book: IBook = {
      authors: googleBook.authors,
      categories: formState.categories,
      description: googleBook.description,
      editorial: googleBook.editorial,
      format: formState.format,
      imageLinks: googleBook.imageLinks,
      isbn: googleBook.isbn,
      language: googleBook.language,
      pageCount: googleBook.pageCount,
      publishedDate: googleBook.publishedDate,
      slug,
      title: googleBook.title,
      tags: formState.tags,
    };

    setFormState(book);
    setNewBook(book);
    setShowModal(false);
  };

  return (
    <div className="modal-search-books__cards--card">
      <div className="modal-search-books__cards--image">
        <Image
          width={180}
          height={280}
          alt={googleBook.title}
          src={googleBook.imageLinks}
        />
        <Button
          buttonStyle="points"
          size="small"
          backgroundColor="green"
          onClick={handleInsertBook}
        >
          insertar
        </Button>
      </div>

      <div className="modal-search-books__cards--content">
        <p>
          <span>ISBN:</span> {googleBook.isbn}{" "}
        </p>
        <p>
          <span>Titulo:</span> {googleBook.title}{" "}
        </p>
        <p style={{ textAlign: "justify" }}>
          <span>Descripción:</span>
          {resumeDescription}{" "}
        </p>
        <p>
          <span>Autor(es):</span> {`${googleBook.authors}`}{" "}
        </p>
        <p>
          <span>Publicado:</span> {`${googleBook.editorial}`}{" "}
        </p>
        <p>
          <span>Categoría(s):</span> {`${googleBook.googleCategories}`}{" "}
        </p>
        <p>
          <span>Idioma:</span> {googleBook.language}{" "}
        </p>
        <p>
          <span>Páginas </span>
          {googleBook.pageCount}{" "}
        </p>
        <p>
          <span>Año:</span> {googleBook.publishedDate}{" "}
        </p>
      </div>
    </div>
  );
};

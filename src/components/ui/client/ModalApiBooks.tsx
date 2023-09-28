import Image from "next/image"
import { Button } from "."

import { FoundBooks } from "@/types/googleBooks";
import { useBooksStore, useUisStore } from "@/store"
import { IBook } from "@/types"

interface GoogleApiBooksProps {
  book: FoundBooks
}

export const ModalApiBooks = ({ book }: GoogleApiBooksProps) => {

  const setBook = useBooksStore(state => state.setBook)
  const setShowModal = useUisStore(state => state.setShowModal)

  const resumeDescription =
    book.description.length < 500 ? book.description : `${book.description.substring(0, 500)}...`;

  const handleInsertBook = () => {

    const searchedBook: IBook = {
      isbn: book.isbn,
      title: book.title,
      authors: book.authors,
      description: book.description,
      categories: book.categories,
      editorial: book.editorial,
      language: book.language,
      pageCount: book.pageCount,
      publishedDate: book.publishedDate,
      format: "printedBook",
      slug: '',
      imageLinks: book.imageLinks
    }

    setBook(searchedBook);
    setShowModal(false);
  }

  return (

    <div className="modal-search-books__cards--card"  >
      <div className="modal-search-books__cards--image" >
        <Image width={180} height={280} alt={book.title} src={book.imageLinks} />
        <Button
          buttonStyle="square"
          borderRadius=".8rem"
          size="small"
          backgroundColor="outline-purple"
          onClick={handleInsertBook}
        >
          insertar
        </Button>
      </div>

      <div className="modal-search-books__cards--content">
        <p><span>ISBN:</span> {book.isbn} </p>
        <p><span>Titulo:</span> {book.title} </p>
        <p style={{ textAlign: 'justify' }} ><span>Descripción:</span>{resumeDescription} </p>
        <p><span>Autor(es):</span> {`${book.authors}`} </p>
        <p><span>Publicado:</span> {`${book.editorial}`} </p>
        <p><span>Categoría(s):</span> {`${book.categories}`} </p>
        <p><span>Idioma:</span> {book.language} </p>
        <p><span>Páginas </span>{book.pageCount} </p>
        <p><span>Año:</span> {book.publishedDate} </p>
      </div>
    </div>
  )
}

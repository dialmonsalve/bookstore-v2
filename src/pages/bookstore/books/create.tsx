import { FormEvent, useState } from "react";

import { useUisStore } from "@/store/ui";
import { useFormStore } from "@/store/form";

import { Layout } from "@/components/layouts/app";
import {
  Alert,
  Button,
  ModalApiBooks,
  InputSearch,
  Spinner,
} from "@/components/ui/client";
import { CreateEditBook } from "@/components/ui/services";

import { formValidator } from "@/helpers";

import { BOOK_VALIDATION_SCHEMA } from "@/constants/bookValidations";
import { useCategories, useCreateBook, useSearchBook } from "@/hooks/books";
import { useBooksStore, useEmployeesStore } from "@/store";
import { IBook, TypeFormat } from "@/types";

const newBook = {
  authors: "",
  categories: [""],
  cost: 0,
  description: "",
  discount: 0,
  editorial: "",
  format: "",
  imageLinks: "",
  isbn: "",
  language: "",
  pageCount: 0,
  price: 0,
  publishedDate: "",
  slug: "",
  tags: "",
  title: "",
  utility: 0,
};

function CreateBooksPage() {
  const queryCategories = useCategories();

  const formState = useFormStore<IBook>((state) => state.formState);
  const foundBooks = useBooksStore((state) => state.foundBooks);

  const session = useEmployeesStore((state) => state.session);

  const errors = formValidator().getErrors(
    formState,
    BOOK_VALIDATION_SCHEMA.newBook
  );
  const [search, setSearch] = useState("");
  const setShowModal = useUisStore((state) => state.setShowModal);
  const showModal = useUisStore((state) => state.showModal);
  const setAlert = useUisStore((state) => state.setAlert);

  const queryBook = useCreateBook();

  const searchBookQuery = useSearchBook();

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length <= 3) {
      setAlert(
        "error",
        true,
        "El campo de búsqueda debe tener al menos 3 caracteres"
      );
      return;
    }
    searchBookQuery.mutate(search);
  };

  const handleCreateBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authors =
      typeof formState.authors === "string"
        ? formState.authors.replaceAll(" ", "").split(",")
        : formState.authors;

    const createBook = {
      ...formState,
      createdFor: session?._id,
      updatedFor: session?._id,
      authors
    };
    if (!session?.username) return;

    queryBook.mutate({ book: createBook, username: session.username });
    
  };

  if (foundBooks === null || foundBooks === undefined) return;

  return (
    <Layout title="Crea Libros">
      {queryCategories.isLoading || (searchBookQuery.isLoading && <Spinner />)}
      <Alert />
      <InputSearch
        search={search}
        setSearch={setSearch}
        onSubmit={handleSearch}
      />
      <form
        method="POST"
        className="form-create-books"
        onSubmit={handleCreateBook}
      >
        <CreateEditBook errors={errors} initialForm={newBook} />

        <div className="form-create-books__button-book">
          <Button
            type="submit"
            backgroundColor="green"
            // disabled={!!errors || registerEmployee.isLoading}
            // disabled={!!errors}
          >
            Crear libro
          </Button>
        </div>
      </form>
      {showModal && (
        <div
          className="modal-search-books"
          onClick={(e) => {
            setShowModal(false);
            e.stopPropagation();
          }}
        >
          <div
            className="modal-search-books__books"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            {foundBooks.map((book) => (
              <div key={book.id} className="modal-search-books__cards">
                <ModalApiBooks book={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CreateBooksPage;

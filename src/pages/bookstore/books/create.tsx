import { FormEvent } from "react";

import { Layout } from "@/components/layouts/app";
import { ModalApiBooks, Spinner, Alert } from "@/components/ui/client";
import { CreateEditBook } from "@/components/ui/services";

import { useNewBook } from "@/hooks/transactions";

function CreateBooksPage() {
  const {
    formState,
    foundBooks,
    session,
    showModal,
    createBookMutation,
    getCategoriesQuery,
    searchBookMutation,
    setShowModal,
  } = useNewBook();

  const handleCreateBook = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const authors =
      typeof formState.authors === "string"
        ? formState.authors.split(",").map((item) => item.trim())
        : formState.authors;

    const createBook = {
      ...formState,
      createdFor: session?._id,
      updatedFor: session?._id,
      authors,
    };
    if (!session?.username) return;

    createBookMutation.mutate({ book: createBook, username: session.username });
  };

  if (foundBooks === null || foundBooks === undefined) return;

  return (
    <Layout title="Crea Libros">
      <Alert />
      {getCategoriesQuery.isLoading ||
        (searchBookMutation.isLoading && <Spinner />)}

      <CreateEditBook onSubmit={handleCreateBook} />

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
                <ModalApiBooks googleBook={book} />
              </div>
            ))}
          </div>
        </div>
      )}
    </Layout>
  );
}

export default CreateBooksPage;

import { useRouter } from "next/router";

import { Layout } from "@/components/layouts/app";
import { Alert, Button, Paginator, Spinner, Table } from "@/components/ui";
import {  useGetBooks } from "@/plugins/dependencies/bookDependency";

const titles = [
  "imagen",
  "ISBN",
  "título",
  "autor(es)",
  "editorial",
  "categoría(s)",
  "precio",
  "descuento",
  "existencia",
];

const nameTableFields = [
  "imageLinks",
  "isbn",
  "title",
  "authors",
  "editorial",
  "categories",
  "price",
  "discount",
  "stock",
];

function AdminBooks() {

  const books = useGetBooks();


  const router = useRouter();

  const handleDeleteBook = () => {};
  const handleEditBook = () => {};

  return (
    <Layout title="libros">
      {books.isLoading && <Spinner />}
      <Alert />

      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="14vh"
        position="absolute"
        right="20%"
        onClick={() => router.push("books/create")}
      />
      {books?.totalBooks === 0 ? (
        <h2 style={{ textAlign: "center", fontSize: "3rem" }}>
          Aún No hay libros
        </h2>
      ) : (
        <>
          <Table
            tableTitles={titles}
            nameTableFields={nameTableFields}
            data={books?.getAll}
            handleDelete={handleDeleteBook}
            handleEdit={handleEditBook}
            isEditable
          />
      <Paginator totalData={books?.totalBooks || 0} query={books} />
        </>
      )}
    </Layout>
  );
}

export default AdminBooks;

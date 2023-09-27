import { useRouter } from "next/router";

import { useBooks } from "@/hooks/books";

import { Layout } from "@/components/layouts/app";
import { Button, Paginator, Spinner, Table } from "@/components/ui/client";

const titles = ['imagen', 'ISBN', 'nombre', 'autor(es)', 'editorial', 'categoría(s)', 'precio', 'descuento', 'existencia']

const nameTableFields = ['imageLinks', 'isbn', 'name', 'author', 'editorial', 'category', 'price', 'discount', 'stock']

function AdminBooks() {

  const { data, isLoading } = useBooks();
  const router = useRouter();


  if (isLoading) return <Spinner />
  if (!data) return;


  return (
    <Layout title="libros" >

      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="14vh"
        position="absolute"
        right="20%"
        onClick={() => router.push('books/create')}
      />
      {
        data.totalBooks === 0 ?

          <h2 style={{ textAlign: 'center', fontSize: '3rem' }} >Aún  No hay libros</h2>
          :
          <>
            <Table
              tableTitles={titles}
              nameTableFields={nameTableFields}
              data={data.books}
              // handleDelete={handleDeleteEmployee}
              // handleEdit={handleEditEmployee}
              isEditable
            />
            <Paginator />
          </>
      }

    </Layout>
  )
}

export default AdminBooks;

import { useRouter } from "next/router";

import { useBookQuery } from "@/hooks/books";

import { Layout } from "@/components/layouts/app";
import { Alert, Button, Paginator, Spinner, Table } from "@/components/ui/client";

const titles = ['imagen', 'ISBN', 'título', 'autor(es)', 'editorial', 'categoría(s)', 'precio', 'descuento', 'existencia']

const nameTableFields = ['imageLinks', 'isbn', 'title', 'authors', 'editorial', 'categories', 'price', 'discount', 'stock']

function AdminBooks() {

  const { getBooksQuery } = useBookQuery();
  
  const{data, isLoading } = getBooksQuery
  const router = useRouter();

const handleDeleteBook = ()=>{

}  
const handleEditBook = ()=>{

}

  if (isLoading) return <Spinner />
  if (!data) return;


  return (
    <Layout title="libros" >
      <Alert />

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
              handleDelete={handleDeleteBook}
              handleEdit={handleEditBook}
              isEditable
            />
            <Paginator
            totalItems={data?.totalBooks}
            />
          </>
      }

    </Layout>
  )
}

export default AdminBooks;

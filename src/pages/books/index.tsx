import { Layout } from "@/components/layouts/e-commerce";
import { useGetBooks } from "@/plugins/dependencies/bookDependency";

import Image from "next/image";

const BooksPage = () => {
  const books = useGetBooks();

  return (
    <Layout
      title="Find your favorite book"
      pageDescription="In this page you find all books categories"
    >
      <h1>Books</h1>

      {books.getAll?.map((book) => {
        const img = `${book.imageLinks}`.replace("http", "https");

        return (
          <div key={book._id}>
            <Image
              width={200}
              height={220}
              src={img || "/media/no-image.svg"}
              alt=""
              priority
            />
            <p>{book.title}</p>
          </div>
        );
      })}
    </Layout>
  );
};

export default BooksPage;

import { useBooksStore, useEmployeesStore, useFormStore } from "@/store";
import {
  Button,
  ErrorMessage,
  FormControl,
  Select,
  Spinner,
  TextArea,
} from "../client";
import Image from "next/image";

import { ErrorMessages, InitialForm } from "@/types";
import { useState } from "react";
import { BOOK_VALIDATION_SCHEMA } from "@/constants/bookValidations";
import { useCategories } from "@/hooks/books";
import { useCreateCategory } from "@/hooks/books/useCreateCategory";

interface Props {
  errors: ErrorMessages<InitialForm | undefined>;
  initialForm: Record<string, any>;
}

const options = [
  {
    _id: 1,
    name: "isbn",
    type: "text",
    label: "ISBN",
  },
  {
    _id: 2,
    name: "title",
    type: "text",
    label: "title",
  },
  {
    _id: 3,
    name: "authors",
    type: "text",
    label: "Autor 1",
  },
  {
    _id: 4,
    name: "author2",
    type: "text",
    label: "Autor 2",
  },
  {
    _id: 5,
    name: "author3",
    type: "text",
    label: "Autor 3",
  },
  {
    _id: 6,
    name: "editorial",
    type: "text",
    label: "Editorial",
  },
  {
    _id: 8,
    name: "publishedDate",
    type: "text",
    label: "publicación",
  },
  {
    _id: 9,
    name: "pageCount",
    type: "number",
    label: "páginas",
  },
  {
    _id: 10,
    name: "language",
    type: "text",
    label: "Idioma",
  },

  {
    _id: 11,
    name: "price",
    type: "number",
    label: "Precio",
  },
  {
    _id: 12,
    name: "discount",
    type: "number",
    label: "descuento",
  },
  {
    _id: 13,
    name: "stock",
    type: "number",
    label: "existencia",
  },
];

export const CreateEditBook = ({ errors, initialForm }: Props) => {
  const [option, setOption] = useState([BOOK_VALIDATION_SCHEMA.options[0]]);
  const [createCategory, setCreateCategory] = useState("");
  const [erroMessage, setErroMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const queryCategories = useCategories();

  const selectedBook = useBooksStore((state) => state.selectedBook);
  const categories = useBooksStore(state => state.categories)
  
  const categoryMutation = useCreateCategory()
  const session =useEmployeesStore(state=>state.session)
  
  const book = selectedBook?.hasOwnProperty("title")
    ? selectedBook
    : initialForm;

  const handleCreateCategory = () => {
    if (createCategory.length < 3) {
      setErroMessage("El campo debe tener al menos 3 caracteres");
      setIsFormSubmitted(true);
      return;
    }

    setIsFormSubmitted(false);

    categoryMutation.mutate({name:createCategory, username:session?.username})
    setCreateCategory("");
  };

  return (
    <>
      <div className="form-create-books__inputs">
        <FormControl
          formFields={options}
          errors={errors}
          initialForm={book}
          className="form-control"
          classNameInput="form-control__input"
          classNameLabel="form-control__label"
        />
      </div>
      <div className="form-create-books__image">
        <Image
          width={180}
          height={280}
          alt={book.title || "no-image"}
          src={book.imageLinks || "/media/no-image.svg"}
          priority
        />
        <input type="file" />
      </div>

      <TextArea
        className="form-create-books__inputs--description"
        initialForm={book}
        name="description"
        placeholder="Descripción"
      />
      {queryCategories.isLoading && <Spinner />}
      <div className="form-create-books__inputs--new-category">
        <div className="form-control">
          <label className="form-control__label" htmlFor="createCategory">
            Crear categoría
          </label>
          <input
            className="form-control__input"
            value={createCategory}
            type="text"
            name="createCategory"
            id="createCategory"
            onChange={(e) => setCreateCategory(e.target.value)}
            onKeyDown={(e) => {
              e.key === "Enter" && handleCreateCategory();
            }}
          />
          <ErrorMessage
            fieldName={[erroMessage]}
            isFormSubmitted={isFormSubmitted}
          />
        </div>

        <Button onClick={handleCreateCategory}>Crear</Button>
      </div>

      <Select
        multiple
        options={categories || []}
        value={option}
        onChange={(o) => setOption(o)}
        name={"categories"}
        label="categorías"
        className="form-create-books__inputs--select"
      />
    </>
  );
};

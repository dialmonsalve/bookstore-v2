import { useBooksStore, useEmployeesStore, useFormStore } from "@/store";
import {
  Button,
  ErrorMessage,
  FormControl,
  InputTags,
  Select,
  TextArea,
} from "../client";
import Image from "next/image";

import { ErrorMessages, InitialForm } from "@/types";
import { useState } from "react";
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
    label: "título",
  },
  {
    _id: 3,
    name: "slug",
    type: "text",
    label: "slug",
  },
  {
    _id: 4,
    name: "authors",
    type: "text",
    label: "Autores",
  },
  {
    _id: 5,
    name: "editorial",
    type: "text",
    label: "Editorial",
  },
  {
    _id: 6,
    name: "publishedDate",
    type: "text",
    label: "publicación",
  },
  {
    _id: 7,
    name: "pageCount",
    type: "number",
    label: "páginas",
  },
  {
    _id: 8,
    name: "language",
    type: "text",
    label: "Idioma",
  },

  {
    _id: 9,
    name: "format",
    type: "text",
    label: "Formato",
  },
  {
    _id: 10,
    name: "cost",
    type: "number",
    label: "costo",
  },
  {
    _id: 11,
    name: "utility",
    type: "number",
    label: "Utilidad",
  },
  {
    _id: 12,
    name: "price",
    type: "number",
    label: "Precio",
  },
  {
    _id: 13,
    name: "discount",
    type: "number",
    label: "descuento",
  },
];

export const CreateEditBook = ({ errors, initialForm }: Props) => {
  const formState = useFormStore((state) => state.formState);
  const value = useFormStore((state) => state.options);
  const [createCategory, setCreateCategory] = useState("");
  const [erroMessage, setErroMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const selectedBook = useBooksStore((state) => state.selectedBook);
  const categories = useBooksStore((state) => state.categories);

  const categoryMutation = useCreateCategory();
  const session = useEmployeesStore((state) => state.session);

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

    categoryMutation.mutate({
      name: createCategory.toLocaleLowerCase(),
      username: session?.username,
    });
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
      <div className="form-create-books__categories">
        <InputTags
          name="tags"
          optionTags={formState.tags || []}
          errors={errors}
          />
        <Select
          multiple
          options={categories || []}
          name={"categories"}
          label="categorías"
          className="form-create-books__categories--select"
          value={value}
          errors={errors}
        />
      </div>

      <div className="form-create-books__new-category">
        <label className="form-control__label" htmlFor="createCategory">
          Nueva categoría
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
        <Button
          className="form-create-books__categories--button"
          onClick={handleCreateCategory}
        >
          Crear categoría
        </Button>
      </div>

      <TextArea
        className="form-create-books__inputs--textarea"
        initialForm={book}
        name="description"
        placeholder="Descripción"
        label="Descripción"
      />
    </>
  );
};

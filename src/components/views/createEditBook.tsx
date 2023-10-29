import { FormEvent, useState } from "react";
import Image from "next/image";

import { useCreateBook,  useGetSearchBooks, useCreateCategory} from "@/plugins/dependencies/bookDependency";

import {
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUIStore,
} from "@/stores";

import {
  Button,
  ErrorMessage,
  FormControl,
  InputSearch,
  InputTags,
  Select,
  TextArea,
} from "../ui";
import { formValidator } from "@/helpers";
import { NEW_BOOK, BOOK_VALIDATION_SCHEMA } from "@/constants/book";

interface Props {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
}

export const CreateEditBook = ({ onSubmit }: Props) => {
  const [search, setSearch] = useState("");
  const [createCategory, setCreateCategory] = useState("");
  const [erroMessage, setErroMessage] = useState("");
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const createBook = useCreateBook()

  const formState = useFormStore((state) => state.formState);
  const value = useFormStore((state) => state.options);
  const setAlert = useUIStore((state) => state.setAlert);

  const searchBookMutation = useGetSearchBooks();
  const createCategoryMutation = useCreateCategory();

  const categories = useBooksStore((state) => state.categories);

  const session = useEmployeesStore((state) => state.session);

  const errors = formValidator().getErrors(
    formState,
    BOOK_VALIDATION_SCHEMA.newBook
  );

  const handleCreateCategory = () => {
    if (createCategory.length < 2) {
      setErroMessage("El campo debe tener al menos 3 caracteres");
      setIsFormSubmitted(true);
      return;
    }
    setIsFormSubmitted(false);

    createCategoryMutation.createCategory({
      name: createCategory.toLocaleLowerCase(),
      username: session?.username,
    });
    setCreateCategory("");
  };

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
    searchBookMutation.searchBook(search);
  };

  const existImage = formState?.imageLinks
    ? formState?.imageLinks
    : "/media/no-image.svg";

  return (
    <>
      <InputSearch
        search={search}
        setSearch={setSearch}
        onSubmit={handleSearch}
      />
      <div className="form-create-books__new-category">
        <label className="form__label" htmlFor="createCategory">
          Nueva categoría
        </label>
        <input
          className="form__input"
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
        <div className="container-button" >
        <Button onClick={handleCreateCategory} type="button">
          Crear categoría
        </Button>
        </div>
      </div>

      <form method="POST" className="form-create-books" onSubmit={onSubmit}>
        <div className="form-create-books__inputs">
          <FormControl
            formFields={NEW_BOOK.formFields}
            errors={errors}
            initialForm={NEW_BOOK.initialForm}
            classNameControl="form__control"
            classNameInput="form__input"
            classNameLabel="form__label"
          />
        </div>

        <div className="form-create-books__image">
          <Image
            width={180}
            height={280}
            alt={formState.title || "no-image"}
            src={existImage}
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

        <TextArea
          className="form-create-books__inputs--textarea"
          initialForm={NEW_BOOK.initialForm}
          name="description"
          placeholder="Descripción"
          label="Descripción"
        />

        <div className="form-create-books__button-book">
          <Button
            type="submit"
            backgroundColor="green"
            disabled={!!errors || createBook.isLoading}
            // disabled={!!errors}
          >
            Crear libro
          </Button>
        </div>
      </form>
    </>
  );
};

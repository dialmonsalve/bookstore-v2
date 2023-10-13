import { FormEvent, useState } from "react";
import Image from "next/image";

import { useSearchBook, useCreateCategory } from "@/hooks/books";
import {
  useBooksStore,
  useEmployeesStore,
  useFormStore,
  useUisStore,
} from "@/store";

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

  const formState = useFormStore((state) => state.formState);
  const value = useFormStore((state) => state.options);
  const setAlert = useUisStore((state) => state.setAlert);

  const searchBookMutation=  useSearchBook()
  const  createCategoryMutation = useCreateCategory()

  const categories = useBooksStore((state) => state.categories);

  const session = useEmployeesStore((state) => state.session);

  const errors = formValidator().getErrors(
    formState,
    BOOK_VALIDATION_SCHEMA.newBook
  );

  const handleCreateCategory = () => {
    if (createCategory.length < 3) {
      setErroMessage("El campo debe tener al menos 3 caracteres");
      setIsFormSubmitted(true);
      return;
    }
    setIsFormSubmitted(false);

    createCategoryMutation.mutate({
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
    searchBookMutation.mutate(search);
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
          onClick={handleCreateCategory}
          type="button"
        >
          Crear categoría
        </Button>
      </div>

      <form method="POST" className="form-create-books" onSubmit={onSubmit}>
        <div className="form-create-books__inputs">
          <FormControl
            formFields={NEW_BOOK.formFields}
            errors={errors}
            initialForm={NEW_BOOK.initialForm}
            className="form-control"
            classNameInput="form-control__input"
            classNameLabel="form-control__label"
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
            // disabled={!!errors || registerEmployee.isLoading}
            // disabled={!!errors}
          >
            Crear libro
          </Button>
        </div>
      </form>
    </>
  );
};

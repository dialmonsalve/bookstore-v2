import { useBooksStore } from "@/store"
import { Button, FormControl, Select } from "../client"
import Image from "next/image"


import { ErrorMessages, InitialForm } from "@/types"
import { useState } from "react"
import { BOOK_VALIDATION_SCHEMA } from "@/constants/bookValidations"

interface Props {
  errors: ErrorMessages<InitialForm | undefined>
  initialForm: Record<string, any>
}

const options = [

  {
    _id: 1,
    name: 'isbn',
    type: 'text',
    label: 'ISBN',
  },
  {
    _id: 2,
    name: 'title',
    type: 'text',
    label: 'title',
  },
  {
    _id: 3,
    name: 'authors',
    type: 'text',
    label: 'Autor 1',
  },
  {
    _id: 4,
    name: 'author2',
    type: 'text',
    label: 'Autor 2',
  },
  {
    _id: 5,
    name: 'author3',
    type: 'text',
    label: 'Autor 3',
  },
  {
    _id: 6,
    name: 'editorial',
    type: 'text',
    label: 'Editorial',
  },
  // {
  //   _id: 6,
  //   name: 'categories',
  //   type: 'text',
  //   label: 'Categoría(s)',
  // },
  // {
  //   _id: 7,
  //   name: 'description',
  //   type: 'text',
  //   label: 'descripción',
  // },
  {
    _id: 8,
    name: 'publishedDate',
    type: 'text',
    label: 'publicación',
  },
  {
    _id: 9,
    name: 'pageCount',
    type: 'number',
    label: 'páginas',
  },
  {
    _id: 10,
    name: 'language',
    type: 'text',
    label: 'Idioma',
  },
  // {
  //   _id: 11,
  //   name: 'imageLinks',
  //   type: 'file',
  //   label: 'Imagen',
  // },
  {
    _id: 11,
    name: 'price',
    type: 'number',
    label: 'Precio',
  },
  {
    _id: 12,
    name: 'discount',
    type: 'number',
    label: 'descuento',
  },
  {
    _id: 13,
    name: 'stock',
    type: 'number',
    label: 'existencia',
  },
  // {
  //   _id: 15,
  //   name: 'format',
  //   type: 'text',
  //   label: 'Formato',
  // },
]

export const CreateEditBook = ({
  errors,
  initialForm
}: Props) => {


  const [option, setOption] = useState([BOOK_VALIDATION_SCHEMA.options[0]]);
  const selectedBook = useBooksStore(state => state.selectedBook)

  const book = selectedBook ? selectedBook : initialForm


  return (
    <>
      <div className="form-create-books__inputs" >
        <FormControl
          formFields={options}
          errors={errors}
          initialForm={book}
          className="form-control"
          classNameInput="form-control__input"
          classNameLabel="form-control__label"
        />

      </div>
      <div className="form-create-books__image" >
        <Image
          width={180}
          height={280}
          alt={book.title || 'no-image'}
          src={book.imageLinks || '/media/no-image.svg'}
          priority
        />
        {/* <label htmlFor="image">image</label> */}
        <input id="image" name="image" type="file" />
      </div>
      <textarea
        name="description"
        id="description"
        cols={30}
        rows={10}
        value={book.description}
        placeholder="Descripción"
        className="form-create-books__inputs--description"
      >
      </textarea>

      <div className="form-create-books__inputs--new-category" >
        <label htmlFor="createCategory">Crear categoría</label>
        <input type="text" name="createCategory" id="createCategory" />
        <Button>Crear</Button>
      </div>

      <Select
        multiple
        options={BOOK_VALIDATION_SCHEMA.options || []}
        value={option}
        onChange={o => setOption(o)}
        name={'categories'}
        label="categorías"
        className="form-create-books__inputs--select"
      />
    </>
  )
}
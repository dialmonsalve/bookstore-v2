import { FormEvent, useState } from 'react';
import Image from "next/image";

import { useForm } from '@/hooks/useForm';
import { useRegisterEmployee } from '@/hooks/employee';
import { useUisStore } from '@/store/ui';
import { useFormStore } from '@/store/form';

import { Layout } from '@/components/layouts/app';
import { AlertSuccess, ApiMessageError, Button, ModalApiBooks, InputSearch, Select, SingleFormControl, Spinner, } from '@/components/ui/client';
import { CreateEditBook, CreateEditPerson } from '@/components/ui/services';

import { formValidator } from '@/helpers';
import { USER_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee, TypeRole } from '@/types';
import { BOOK_VALIDATION_SCHEMA } from '@/constants/bookValidations';
import { useSearchBook } from '@/hooks/books';
import { useBooksStore } from '@/store';



const newBook = {
  search: '',
  isbn: '',
  title: '',
  authors: '',
  author2: '',
  author3: '',
  editorial: '',
  categories: [''],
  description: '',
  publishedDate: '',
  pageCount: 0,
  language: '',
  imageLinks: '',
  price: 0,
  discount: 0,
  stock: 0,
  format: [''],
}

function CreateBooksPage() {

  // const [option, setOption] = useState<TypeRole[]>([USER_VALIDATION_SCHEMA.ROLES[0]] as TypeRole[]);

  // const setErrorApiMessage = useUisStore(state => state.setErrorMessage);
  // const registerEmployee = useRegisterEmployee();

  // const { handleFieldChange } = useForm(newBook)
  const formState = useFormStore(state => state.formState)
  // const checkFormErrors = useFormStore(state => state.checkFormErrors)
  const findBooks = useBooksStore(state => state.findBooks)


  const errors = formValidator().getErrors(formState, BOOK_VALIDATION_SCHEMA.newBook);
  const [search, setSearch] = useState("")
  const setShowModal = useUisStore(state => state.setShowModal)
  const showModal = useUisStore(state => state.showModal)



  const searchBookQuery = useSearchBook()

  // const handleRegisterEmployee = (e: FormEvent) => {
  //   e.preventDefault();
  //   const hasErrors = checkFormErrors(errors);

  //   const newRoles = option.map(opt => {
  //     return opt
  //   })

  //   if (newRoles.length === 0) {
  //     setErrorApiMessage(true, 'El usuario debe tener al menos 1 rol');
  //     setTimeout(() => setErrorApiMessage(false), 3000);
  //     return;
  //   }
  //   if (!hasErrors) {
  //     const { repitePassword, ...rest } = formState
  //     const newEmployee = { ...rest, role: newRoles }
  //     registerEmployee.mutate(newEmployee as IEmployee);
  //   }
  // }

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.length <= 3) return
    searchBookQuery.mutate(search)

  }
  if (findBooks === null || findBooks === undefined) return

  return (
    <Layout title='Crea Libros' >
      <ApiMessageError />
      <AlertSuccess />
      {/* {registerEmployee.isLoading && <Spinner />} */}

      <InputSearch search={search} setSearch={setSearch} onSubmit={handleSearch} />

      <form
        method='POST'
        className='form-create-books'
      // onSubmit={handleRegisterEmployee}
      >
        <CreateEditBook
          errors={errors}
          initialForm={newBook}
        />

        <div className='form-create-books__button-book' >
          <Button
            type='submit'
            backgroundColor='green'
            // disabled={!!errors || registerEmployee.isLoading}
            disabled={!!errors}
          >
            {/* {`${registerEmployee.isLoading ? 'Espere' : 'Crear Cuenta'} `}
             */}
            Crear libro
          </Button>

        </div>
      </form>

      {
        searchBookQuery.isLoading && <Spinner /> ||

        showModal &&

        <div className="modal-search-books"
          onClick={(e) => {
            setShowModal(false);
            e.stopPropagation();
            console.log(showModal);
          }}

        >
          <div className="modal-search-books__books"
            onClick={(e) => { e.stopPropagation() }}
          >
            {
              findBooks.map(book => (
                <div key={book.id} className="modal-search-books__cards" >
                  <ModalApiBooks book={book} />
                </div>
              ))
            }
          </div>
        </div>}
    </Layout>
  )
}

export default CreateBooksPage
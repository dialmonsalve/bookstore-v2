import { FormEvent } from "react";

import { Layout } from "@/components/layouts/app";
import { ErrorMessage, FormControl } from "@/components/ui/client";

import { Transactions } from "@/components/ui/services/Transactions";
import { usePurchaseOrders } from "@/hooks/transactions";
import { useBooksStore, useEmployeesStore, useUITransactionStore } from "@/store";

import { CONST_FORM_ORDER } from "@/constants";
import { useSearchBook } from "@/hooks/books";


export default function CreatePurchaseOrdersPage() {

  const {
    disabled,
    errors,
    formState,
    isTouched,
    itemsOrder,
    setNewFieldsForm,
    handleBlur,
    handleFieldChange,
  } = usePurchaseOrders()


  const { titles, formTable, nameTableFields } = setNewFieldsForm()

  const session = useEmployeesStore(state => state.session);
  const formItems = useUITransactionStore(state => state.formItems);
  const { nit, productType, provider, observations, ...mainForm } = formState;

  const searchBooks = useSearchBook()
  const findBooks = useBooksStore(state=>state.findBooks)

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();

    const newItems = formItems.map(({ item, _id, ...rest }) => rest);

    const newPurchaseOrder = {
      nit,
      productType,
      provider,
      observations,
      newItems: [...newItems],
      employee: session?._id
    }
    console.log(formTable);
  }

  // const slug = (value: string) => {

  //   if (formTable[1].name === "name") {

  //     const newSlug = value.trim()
  //       .replaceAll(' ', '-')
  //       .replaceAll("'", '')
  //       .toLocaleLowerCase() || ''
  //     return newSlug;
  //   }
  // }
  // const  newSlug  = slug(formState.name)


  const searchBook = async () => {
    if (formState.code.length <= 3) return

    searchBooks.mutate(formState.code)

    // console.log(searchBooks.data);
  }


  return (
    <Layout title="Crear Ordenes de compra" >
      <div className="transactions" >
        <form className="form-transactions" action="POST" onSubmit={handleCreateOrder} >
          <Transactions
            initialForm={itemsOrder}
            formReset={{ ...formState, code: '', name: '', quantity: 1, author: '', size: '', editorial: '' }}
            mainForm={mainForm}
            nameTableFields={nameTableFields}
            newFieldForm={formTable}
            tableTitles={titles}
            errors={errors}
            isEditable={false}
            productType={formState.productType}
            onClick={searchBook}
          >
            <div>
              <div className="transactions-body__info--control" >
                <label
                  htmlFor='productType'
                  className="transactions-body__info--label"
                >
                  Producto
                </label>

                <select
                  disabled={disabled}
                  name="productType"
                  onChange={handleFieldChange}
                  id="productType"
                  value={formState.productType}
                  onBlur={handleBlur}
                  className={`transactions-body__info--input ${disabled ? 'input-disabled' : ''}`}
                >
                  <option value=""></option>
                  <option value="book">libro</option>
                  <option value="stationery">papelería</option>
                  <option value="toy">juguetes</option>
                  <option value="fashion">Ropa</option>
                </select>
              </div>
              <ErrorMessage
                fieldName={errors?.productType}
                isTouched={isTouched?.productType}
                isFormSubmitted={false}
              />
            </div>

            <FormControl
              formFields={CONST_FORM_ORDER.infoProvider}
              initialForm={itemsOrder}
              disabled={disabled}
              errors={errors}
              className="transactions-body__info--control"
              classNameInput="transactions-body__info--input"
              classNameLabel="transactions-body__info--label"
            />
          </Transactions>
        </form>
      </div>

      {
        findBooks?.map(book=>(
          <div key={book.id} >
            {book.volumeInfo.title}
          </div>
        ))
      }
    </Layout>
  )
}
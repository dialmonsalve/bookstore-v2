import { FormEvent } from "react";

import { useForm } from "@/hooks/useForm";
import { useUITransactionStore } from "@/store";

import { Layout } from "@/components/layouts/app";
import { Button, ErrorMessage, FormControl, Table } from "@/components/ui/client";
import { FooterTransaction, HeaderTransaction } from "@/components/ui/client";

import { CONST_PURCHASE_ORDER, TRANSACTION_VALIDATION_SCHEMA } from "@/constants";
import { useFormStore } from "@/store/form";
import { formValidator } from "@/helpers";

const titles = ['código', 'Nombre', 'Autor', 'Cantidad', 'Talla']
const nameTableFields = ['code', 'name', 'author', 'quantity', 'size']

interface ItemsOrder {
  item: number,
  code: string,
  name: string,
  quantity: number,
  author: string,
  size: string,
  productType: string,
  nit: string,
  provider: string,
  observations: string,
}

const itemsOrder: ItemsOrder = {
  item: 1,
  code: '',
  name: '',
  quantity: 1,
  author: '',
  size: '',
  productType: '',
  nit: '',
  provider: '',
  observations: '',
}

export default function CreatePurchaseOrdersPage() {

  const { handleFieldChange } = useForm(itemsOrder);
  const formState = useFormStore<ItemsOrder>(state => state.formState);
  const handleResetForm = useFormStore(state => state.handleResetForm);
  const handleBlur = useFormStore(state => state.handleBlur);
  const isTouched = useFormStore(state => state.isTouched);

  const uiTransaction = useUITransactionStore();
  const items = useUITransactionStore(state => state.formItems);
  const disabled = useUITransactionStore(state => state.disabled);
  const clearAllItems = useUITransactionStore(state => state.clearAllItems);

  const errors = formValidator().getErrors(formState, TRANSACTION_VALIDATION_SCHEMA.newOrder)

  const { nit, productType, provider, observations, ...mainForm } = formState;

  const setNewFieldsForm = () => {

    switch (formState.productType) {
      case 'book':
        return [...CONST_PURCHASE_ORDER.baseForm, ...CONST_PURCHASE_ORDER.bookForm];
      case 'fashion':
        return [...CONST_PURCHASE_ORDER.baseForm, ...CONST_PURCHASE_ORDER.fashionForm];
      case 'stationery' || 'fashion':
        return [...CONST_PURCHASE_ORDER.baseForm];
      case 'toy':
        return [...CONST_PURCHASE_ORDER.baseForm];
      default:
        return [];
    }
  }

  const newFieldForm = setNewFieldsForm()

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();

    const newItems = items.map(({ item, _id, ...rest }) => rest);

    const newPurchaseOrder = {
      nit,
      productType,
      provider,
      observations,
      newItems: [...newItems]
    }
    console.log(newPurchaseOrder);
  }

  return (
    <Layout title="Crear Ordenes de compra" >

      <div className="transactions" >

        <form className="form-transactions" action="POST" onSubmit={handleCreateOrder} >

          <HeaderTransaction />

          <div className="transactions-body" >

            <div className="transactions-body__inputs" >

              <label
                htmlFor='productType'
              >
                Producto
              </label>
              <div className="transactions-body__select" >
                <select
                  disabled={disabled}
                  name="productType"
                  onChange={handleFieldChange}
                  id="productType"
                  value={formState.productType}
                  onBlur={handleBlur}
                >
                  <option value=""></option>
                  <option value="book">libro</option>
                  <option value="stationery">papelería</option>
                  <option value="toy">juguetes</option>
                  <option value="fashion">Ropa</option>
                </select>
                <ErrorMessage
                  fieldName={errors?.productType}
                  isTouched={isTouched?.productType}
                  isFormSubmitted={false}
                />
              </div>
              <FormControl
                formFields={CONST_PURCHASE_ORDER.nitOrder}
                handleFieldChange={handleFieldChange}
                className="transactions-body__inputs--inputs"
                disabled={disabled}
                errors={errors}
              />
            </div>

            <div className="transactions-body__info" >
              <FormControl
                formFields={newFieldForm}
                handleFieldChange={handleFieldChange}
                className="transactions-body__info--inputs"
                errors={errors}
              />
            </div>
            <Button
              buttonStyle="square"
              backgroundColor="green"
              borderRadius=".8rem"
              onClick={() => {
                uiTransaction.handleAddItem(mainForm)
                handleResetForm({ ...formState, code: '', name: '', quantity: 1, author: '', size: '' })
              }}
              disabled={!!errors}
            >
              add
            </Button>

            <Table
              data={uiTransaction.formItems}
              tableTitles={titles}
              nameTableFields={nameTableFields}
              handleDelete={uiTransaction.handleRemoveItem}
              isEditable={false}
            />
          </div>

          <FooterTransaction
            length={uiTransaction.formItems.length}
            handleFieldChange={handleFieldChange} />

          <div className="transactions-button__left" >

            <Button
              disabled={items.length === 0}
              backgroundColor="green" type="submit" >
              Crear
            </Button>
          </div>
          <div className="transactions-button__right" >

            <Button
              onClick={() => {
                clearAllItems()
                handleResetForm(itemsOrder)
              }}
              backgroundColor="red" type="button"
              disabled={!disabled}
              >
              Limpiar
            </Button>
          </div>
        </form>
      </div>
    </Layout>
  )
}
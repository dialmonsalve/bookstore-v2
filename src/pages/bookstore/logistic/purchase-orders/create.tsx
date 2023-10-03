import { FormEvent } from "react";

import { Layout } from "@/components/layouts/app";
import {
  Alert,
  Button,
  ErrorMessage,
  FormControl,
  Modal,
} from "@/components/ui/client";

import { Transactions } from "@/components/ui/services/Transactions";
import {
  usePurchaseOrders,
} from "@/hooks/transactions";


import { CONST_FORM_ORDER } from "@/constants";


export default function CreatePurchaseOrdersPage() {
  const {
    book,
    createPurchaseOrder,
    disabled,
    errors,
    formItems,
    formState,
    getBookByISBNMutation,
    isTouched,
    itemsOrder,
    router,
    session,
    handleBlur,
    handleFieldChange,
    setNewFieldsForm,
    setShowModal,
  } = usePurchaseOrders();

  const { titles, formTable, nameTableFields } = setNewFieldsForm();

  const { nit, productType, provider, observations, ...mainForm } = formState;

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();

    const newItems = formItems.map(({ _id, ...rest }) => rest);

    const newPurchaseOrder = {
      nit,
      productType,
      provider,
      observations,
      items: [...newItems],
    };
    
    createPurchaseOrder.mutate({
      purchaseOrder: newPurchaseOrder,
      username: session?.username,
    });
  };

  const handleNavigation = () => {
    setShowModal(false);
    router.push("/bookstore/books/create");
  };

  const handleSearchBook = () => {
    getBookByISBNMutation.mutate(formState.isbn);
  };

  return (
    <>
      <Modal typeModal="error">
        <Button onClick={handleNavigation}>Crear</Button>
      </Modal>
      <Layout title="Crear Ordenes de compra">
        <Alert />
        <div className="transactions">
          <form
            className="form-transactions"
            action="POST"
            onSubmit={handleCreateOrder}
          >
            <Transactions
              initialForm={itemsOrder}
              formReset={{
                ...formState,
                isbn: "",
                title: "",
                quantity: 1,
                authors: "",
                size: "",
                editorial: "",
              }}
              mainForm={mainForm}
              nameTableFields={nameTableFields}
              newFieldForm={formTable}
              tableTitles={titles}
              errors={errors}
              isEditable={false}
              productType={formState.productType}
              onClick={handleSearchBook}
            >
              <div className="form-control">
                <label htmlFor="productType" className="form-control__label">
                  Producto
                </label>

                <select
                  disabled={disabled}
                  name="productType"
                  onChange={handleFieldChange}
                  id="productType"
                  value={formState.productType}
                  onBlur={handleBlur}
                  className={`form-control__input ${
                    disabled ? "input-disabled" : ""
                  }`}
                >
                  <option value=""></option>
                  <option value="Book">libro</option>
                  <option value="Stationery">papelería</option>
                  <option value="Toy">juguetes</option>
                  <option value="Fashion">Ropa</option>
                </select>
                <ErrorMessage
                  fieldName={errors?.productType}
                  isTouched={isTouched?.productType}
                  isFormSubmitted={false}
                />
              </div>

              <FormControl
                formFields={CONST_FORM_ORDER.infoProvider}
                initialForm={book || itemsOrder}
                disabled={disabled}
                errors={errors}
                className="form-control"
                classNameInput="form-control__input"
                classNameLabel="form-control__label"
              />
            </Transactions>
          </form>
        </div>
      </Layout>
    </>
  );
}

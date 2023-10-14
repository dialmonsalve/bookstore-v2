import { ErrorMessage, FormControl, Transactions } from "@/components/ui";
import { INVENTORY_ENTRIES } from "@/constants";
import { useInventoryEntries } from "@/hooks/transactions";

export const CreateInventoryEntryView = () => {

  const {
    disabled,
    errors,
    formState,
    isTouched,
    itemsOrder,
    mainForm,
    setNewFieldsForm,
    handleBlur,
    handleCreateOrder,
    handleFieldChange,
  } = useInventoryEntries();

  const { titles, formTable, nameTableFields } = setNewFieldsForm();
  return (
    <form
          className="form-transactions"
          action="POST"
          onSubmit={handleCreateOrder}
        >
          <Transactions
            initialForm={itemsOrder}
            formReset={{
              ...formState,
              code: "",
              name: "",
              quantity: 1,
              author: "",
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
          >
            <div className="form__control">
              <label
                htmlFor="typeEntry"
                className="form__label"
              >
                Desde
              </label>
              <select
                disabled={disabled}
                name="typeEntry"
                onChange={handleFieldChange}
                id="typeEntry"
                value={formState.typeEntry}
                onBlur={handleBlur}
                className={`form__input ${
                  disabled ? "input-disabled" : ""
                }`}
              >
                <option value=""></option>
                <option value="purchaseOrder">OC</option>
              </select>
            </div>

            <FormControl
              formFields={INVENTORY_ENTRIES.infoProvider}
              initialForm={itemsOrder}
              classNameControl="form__control"
              classNameInput="form__input"
              classNameLabel="form__label"
              disabled={disabled}
              errors={errors}
            />

            <div className="form__control" >
              
                <label
                  htmlFor="productType"
                  className="form__label"
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
                  className={`form__input ${
                    disabled ? "input-disabled" : ""
                  }`}
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
          </Transactions>
        </form>
  )
}

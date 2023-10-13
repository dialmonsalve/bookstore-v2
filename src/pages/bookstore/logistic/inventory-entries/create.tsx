import { Layout } from "@/components/layouts/app";
import { ErrorMessage, FormControl, Transactions } from "@/components/ui";
import { INVENTORY_ENTRIES } from "@/constants";
import { useInventoryEntries } from "@/hooks/transactions";

export default function CreateInventoryEntriesPage() {
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
    <Layout title="Ingresar Productos">

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
            <div className="form-control">
              <label
                htmlFor="typeEntry"
                className="form-control__label"
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
                className={`form-control__input ${
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
              className="form-control"
              classNameInput="form-control__input"
              classNameLabel="form-control__label"
              disabled={disabled}
              errors={errors}
            />

            <div className="form-control" >
              
                <label
                  htmlFor="productType"
                  className="form-control__label"
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
                  className={`form-control__input ${
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
      </div>
    </Layout>
  );
}

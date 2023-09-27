import { Layout } from "@/components/layouts/app";
import { ErrorMessage, FormControl } from "@/components/ui/client";
import { Transactions } from "@/components/ui/services/Transactions";
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

  const { titles, formTable,  nameTableFields } = setNewFieldsForm()

  return (
    <Layout title="Ingresar Productos" >

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
          >
            <div className="transactions-body__info--control" >
              <label
                htmlFor='typeEntry'
                className="transactions-body__info--label"
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
                className={`transactions-body__info--input ${disabled ? 'input-disabled' : ''}`}
              >
                <option value=""></option>
                <option value="purchaseOrder">OC</option>
              </select>
            </div>

            <FormControl
              formFields={INVENTORY_ENTRIES.infoProvider}
              initialForm={itemsOrder}
              className="transactions-body__info--control"
              classNameInput="transactions-body__info--input"
              classNameLabel="transactions-body__info--label"
              disabled={disabled}
              errors={errors}
            />

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
          </Transactions>
        </form>
      </div>
    </Layout>
  )
}
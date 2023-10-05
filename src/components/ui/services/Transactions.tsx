import {
  Button,
  FooterTransaction,
  FormControl,
  HeaderTransaction,
  Table,
} from "../client";
import { FormOptions, useFormStore, useUITransactionStore } from "@/store";
import { ErrorMessages, InitialForm } from "@/types";
import { ReactNode } from "react";

interface TransactionsProps {
  children: ReactNode;
  errors?: ErrorMessages<InitialForm | undefined>;
  formReset: Record<string, any>;
  isEditable: boolean;
  initialForm: Record<string, any>;
  mainForm: Record<string, any>;
  nameTableFields: string[];
  newFieldForm: FormOptions[];
  productType?: string;
  tableTitles: string[];
  onClick?: () => void;
}

export const Transactions = ({
  children,
  errors,
  formReset,
  isEditable,
  initialForm,
  mainForm,
  nameTableFields,
  newFieldForm,
  productType,
  tableTitles,
  onClick,
}: TransactionsProps) => {
  const handleResetForm = useFormStore((state) => state.handleResetForm);

  const {
    disabled,
    formItems,
    clearAllItems,
    handleAddItem,
    handleRemoveItem,
  } = useUITransactionStore();

  return (
    <>
      <HeaderTransaction />

      <div className="transactions-body">
        <div className="transactions-body__info">
          {children}

          <FormControl
            formFields={newFieldForm}
            initialForm={initialForm}
            className="form-control"
            classNameInput="form-control__input"
            classNameLabel="form-control__label"
            errors={errors}
          />
          {productType === "Book" && (
            <div className="container-button" >

              <Button
                disabled={mainForm.isbn.length <= 3}
                size="small"
                onClick={onClick}
              >
                buscar
              </Button>
            </div>
            )}
        </div>
        <div className="container-button" >
        <Button
          backgroundColor="green"
          onClick={() => {
            handleAddItem(mainForm);
            handleResetForm(formReset);
          }}
          disabled={!!errors  || mainForm.title === ''}
        >
          add
        </Button>
        </div>

        <Table
          data={formItems}
          tableTitles={tableTitles}
          nameTableFields={nameTableFields}
          handleDelete={handleRemoveItem}
          isEditable={isEditable}
        />
      </div>

      <FooterTransaction initialForm={initialForm} />

      <div className="transactions-footer">
        <div className="transactions-button__left">
          <Button
            disabled={formItems.length === 0}
            backgroundColor="green"
            type="submit"
          >
            Crear
          </Button>
        </div>
        <div className="transactions-button__right">
          <Button
            onClick={() => {
              clearAllItems();
              handleResetForm(initialForm);
            }}
            backgroundColor="red"
            type="button"
            disabled={!disabled}
          >
            Limpiar
          </Button>
        </div>
      </div>
    </>
  );
};

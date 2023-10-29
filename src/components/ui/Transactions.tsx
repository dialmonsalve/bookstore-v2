import { ReactNode } from "react";
import {
  Button,
  FooterTransaction,
  FormControl,
  HeaderTransaction,
  Table,
} from "./";
import { useShallow } from "zustand/react/shallow";
import {  useFormStore, useUIStore } from "@/stores";
import { ErrorMessages, InitialForm } from "@/types";
import { FormOptions } from "@/stores/interfaces.store";

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

  const disabled = useUIStore(useShallow((state) => state.disabled));
  const formItems = useUIStore(useShallow((state) => state.formItems));
  const clearItems = useUIStore(useShallow((state) => state.clearItems));
  const addItem = useUIStore(useShallow((state) => state.addItem));
  const removeItem = useUIStore(useShallow((state) => state.removeItem));

  return (
    <>
      <HeaderTransaction />

      <div className="transactions-body">
        <div className="transactions-body__info">
          {children}

          <FormControl
            formFields={newFieldForm}
            initialForm={initialForm}
            classNameControl="form__control"
            classNameInput="form__input"
            classNameLabel="form__label"
            errors={errors}
          />
          {productType === "Book" && (
            <div className="container-button">
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
        <div className="container-button">
          <Button
            backgroundColor="green"
            onClick={() => {
              addItem(mainForm);
              handleResetForm(formReset);
            }}
            disabled={!!errors || mainForm.title === ""}
          >
            add
          </Button>
        </div>

        <Table
          data={formItems}
          tableTitles={tableTitles}
          nameTableFields={nameTableFields}
          handleDelete={removeItem}
          isEditable={isEditable}
        />
      </div>

      <FooterTransaction initialForm={initialForm} />

      <div className="transactions-footer">
        <div className="transactions-button__left">
          <Button
            buttonStyle="points"
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
              clearItems();
              handleResetForm(initialForm);
            }}
            buttonStyle="points"
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

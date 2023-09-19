
import { useState } from "react";

import { Button, RowForm, Table, TableHeader, Td, TdForm } from "@/components/ui/client";

import { GenericOption, ReactChangeEvent } from "@/types";


interface Props {
  formState: Record<string, any>;
  handleFieldChange: (e: ReactChangeEvent) => void
  handleResetForm: () => void
  options: GenericOption[]
  height:string
}

export function TableInputForm({ formState, options, height, handleFieldChange, handleResetForm }: Props) {

  const [formItems, setFormItems] = useState<Record<string, any>[]>([]);

  const handleAddItem = (newFormState: Record<string, any>) => {

    const updatedItems = formItems.map(item => {
      if (item.code === newFormState.code) {
        return {
          ...item,
          quantity: item.quantity + Number(newFormState.quantity)
        };
      }
      return item;
    });

    const isCodeExisting = updatedItems.some(item => item.code === newFormState.code);

    if (!isCodeExisting) {
      updatedItems.push({
        ...newFormState,
        quantity: Number(newFormState.quantity),
        item: formItems.length + 1
      });
    }

    setFormItems(updatedItems);
    
    handleResetForm()
  }
  const handleRemoveComponent = (itemToRemove: number) => {
    const updatedItems = formItems.filter(item => item.item !== itemToRemove);

    const updatedItemsWithAdjustedItem = updatedItems.map(item => {
      if (item.item > itemToRemove) {
        return {
          ...item,
          item: item.item - 1
        };
      }
      return item;
    });
    setFormItems(updatedItemsWithAdjustedItem);
  };
  const handleEditComponent = (itemToEdit: number) => {
    console.log(itemToEdit);
  };

  return (
    <div className="table-input" >
      <h4 className="table-input__title" >items</h4>
      <Table height={height}>
        <TableHeader>
          <Td>items</Td>
          {
            options.map(option => (
              <Td key={option.title}>{option.title}</Td>
            ))
          }
          <Td colSpan={2} textAlign="center">
            Acciones
          </Td>
        </TableHeader>
        <tbody>
          <RowForm>
            <TdForm textAlign="center">
              <p></p>
            </TdForm>
            {
              options.map(option => (
                <TdForm key={option.item}>
                  <input
                    type={`${option.type}`}
                    name={`${option.name}`}
                    onChange={handleFieldChange}
                    value={formState[option.name]}
                    className="table__input"
                  />
                </TdForm>
              ))
            }
            <TdForm colSpan={2}>
              <Button
                buttonStyle="square"
                backgroundColor="green"
                borderRadius=".8rem"
                width="100%"
                onClick={() => handleAddItem(formState)}
              >
                add
              </Button>
            </TdForm>
          </RowForm>
          {formItems.map(item => (
            <RowForm key={item.item}>
              <TdForm textAlign="center">{item.item}</TdForm>
              {options.map(option => (
                <TdForm key={option.item}>{item[option.name]}</TdForm>
              ))}
              <TdForm>
                <Button
                  buttonStyle="iconButton"
                  ico="edit"
                  onClick={() => handleEditComponent(item.item)}
                />
              </TdForm>
              <TdForm>
                <Button
                  buttonStyle="iconButton"
                  ico="trash"
                  onClick={() => handleRemoveComponent(item.item)}
                />
              </TdForm>
            </RowForm>
          ))}
        </tbody>
      </Table>
    </div>
  )
}
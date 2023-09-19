import { Layout } from "@/components/layouts/app";
import { Button, FormControl, TableInputForm } from "@/components/ui/client";
import { useForm } from "@/hooks/useForm";
import { GenericOption } from "@/types";
import { FormEvent } from "react";

const newPurchaseOrder = {
  provider: '',
  nit: '',
  observations: '',
  item: 0,
  code: '',
  description: '',
  quantity: 1,
}
interface Options extends GenericOption {
  item: number;
  title: string
  type: string
  name: string
}

const formOptions: Options[] = [
  {
    item: 0,
    title: 'código',
    type: 'text',
    name: 'code',
  },
  {
    item: 1,
    title: 'Descripción',
    type: 'text',
    name: 'description',
  },
  {
    item: 2,
    title: 'Cantidad',
    type: 'number',
    name: 'quantity',
  },
]


export default function CreatePurchaseOrdersPage() {

  const { formState, handleBlur, isTouched, handleFieldChange, handleResetForm } = useForm(newPurchaseOrder)

  const handleCreateOrder = (e: FormEvent) => {
    e.preventDefault();

    console.log(formState);

  }

  return (
    <Layout title="Crear Ordenes de compra" >

      <form className="form-order" action="POST" onSubmit={handleCreateOrder} >
        <div className="header-nit" >
          <FormControl
            label="NIT"
            type="text"
            name="nit"
            placeholder="Nit"
            value={formState.nit}
            onChange={handleFieldChange}
          />
          <FormControl
            label="Proveedor"
            type="text"
            name="provider"
            placeholder="Proveedor"
            value={formState.provider}
            onChange={handleFieldChange}
          />
        </div>

        <div className="header-date">
          <p >Fecha: 17/09/2023</p>
          <p >Dirección</p>
          <p >Teléfono</p>
          <p >Contacto</p>
        </div>

        <TableInputForm
          handleResetForm={handleResetForm}
          handleFieldChange={handleFieldChange}
          formState={formState}
          options={formOptions}
          height="35vh"
        />

        <textarea
          name="observations"
          cols={60}
          rows={8}
          onChange={handleFieldChange}
          value={formState.observations}
          className="textarea-table-input"
          placeholder="observaciones"
        >
        </textarea>
        <div className="count-items" >
          <p >Comprador</p>
          <p >Total Items: {0}</p>
        </div>

        <Button backgroundColor="green" type="submit" >
          Guardar
        </Button>

      </form>

    </Layout>
  )
}
import { Layout } from "@/components/layouts/app";
import { Button, FormControl, Row, RowForm, Table, TableHeader, Td, TdForm } from "@/components/ui/client";
import { useForm } from "@/hooks/useForm";
import { ReactNode,  useState } from "react";

const newPurchaseOrder = {
  provider: '',
  nit: '',
  observations: '',
  code: '',
  description: '',
  quantity: 0
}

function generateUniqueId() {
  const currentDate = new Date();
  const randomValue = Math.floor(Math.random() * 1000000000);

  const uniqueId = `${currentDate.getTime()}_${randomValue}`;
  const base64Id = btoa(uniqueId); // Codificar en Base64

  return base64Id;
}

export default function CreatePurchaseOrdersPage() {

  const [components, setComponents] = useState<ReactNode[]>([]);
  const [componentCount, setComponentCount] = useState(0);

  const { formState, handleBlur, isTouched, handleFieldChange, handleResetForm } = useForm(newPurchaseOrder)


  const handleAddComponent = () => {

    const uniqueId = generateUniqueId()
    console.log(components);
    

    setComponentCount(prevCount => prevCount + 1);
    setComponents((prevComponents) => [
      ...prevComponents,
      <RowForm key={uniqueId} >
        <TdForm textAlign="center" >
          <label >{componentCount + 1}</label>
        </TdForm>
        <TdForm>
          <label >{formState.code}</label>
        </TdForm>
        <TdForm>
          <label >{formState.description}</label>
        </TdForm>
        <TdForm>
          <label >{formState.quantity}</label>
        </TdForm>
        <TdForm>
          <Button
            onClick={() => handleRemoveComponent(uniqueId)}
            buttonStyle="square" borderRadius=".5rem" backgroundColor="red" >del</Button>
        </TdForm>
      </RowForm>
    ]);

    handleResetForm()
  };

  const handleRemoveComponent = (index: string) => {

    setComponents((prevComponents) => {
      const newComponents = [...prevComponents];
      newComponents.splice(parseInt(index, 10), 1);
      return newComponents;

    });
  };

  return (
    <Layout title="Crear Ordenes de compra" >

      <form action="POST">
        <div>
          <label >Numero de orden: 123</label>
          <label >Fecha: 17/09/2023</label>
          <select name="typeProduct" id="">
            <option value=""></option>
            <option value="book">libros</option>
            <option value="book">papelería</option>
            <option value="book">Ropa</option>
            <option value="book">Juguetes</option>
          </select>
        </div>

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
        <div>
          <label htmlFor="">Dirección</label>
          <label htmlFor="">Teléfono</label>
          <label htmlFor="">Estado de la orden: Abierta</label>
          <label htmlFor="">Contacto</label>
        </div>

        <div>
          <h4>items</h4>
          <Table height="40vh" >
            <TableHeader >
              <Td >Item</Td>
              <Td >Código</Td>
              <Td >Descripción</Td>
              <Td >Cantidad</Td>
              <Td colSpan={2} textAlign='center' >Acciones</Td>
            </TableHeader>
            <tbody>
              <RowForm>
                <TdForm textAlign="center" >
                  <label >Numero</label>
                </TdForm>
                <TdForm>
                  <input
                    className="table__input"
                    type="text"
                    value={formState.code}
                    onChange={handleFieldChange}
                    name="code"
                  />
                </TdForm>
                <TdForm>
                  <input
                    className="table__input"
                    type="text"
                    value={formState.description}
                    onChange={handleFieldChange}
                    name="description"
                  />
                </TdForm>
                <TdForm>
                  <input
                    className="table__input"
                    type="number"
                    value={formState.quantity}
                    onChange={handleFieldChange}
                    name="quantity"
                  />
                </TdForm>
                <TdForm>
                  <Button
                    onClick={handleAddComponent}
                    buttonStyle="square" borderRadius=".5rem" backgroundColor="green" >add</Button>
                </TdForm>
              </RowForm>
              {components.map((component) => component)}

            </tbody>
          </Table>
        </div>

        <textarea
          name="observations"
          cols={60}
          rows={10}
          onChange={handleFieldChange}
          value={formState.observations}
        >
        </textarea>
        <label htmlFor="">Comprador</label>
        <label htmlFor="">Total Items: 4</label>

      </form>

    </Layout>
  )
}
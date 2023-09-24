import { Layout } from "@/components/layouts/app";

import { useForm } from "@/hooks/useForm";
import { formOptions, useFormStore } from "@/store/form";

import { Button,  FormControl } from "@/components/ui/client";

import { formValidator } from "@/helpers";
import { ReactChangeEvent } from "@/types";
import { FormEvent } from "react";

interface HolaForm  {
  hola: string,
  mundo: string,
  puerco: string
}
const holaForm = {
  hola: '',
  mundo: '',
  puerco: 0
}

const holaSchema = {
  hola: formValidator()
    .string()
    .required('Campo nombre es requerido')
    .min(3, 'El nombre debe tener al menos de 3 caracteres'),
  mundo: formValidator()
    .string()
    .required('Campo mundo es requerido')
    .min(8, 'El mundo debe tener al menos de 8 caracteres'),
}

const options:formOptions[] = [
  {
    _id: 0,
    name: 'hola',
    type: 'text',
    label: 'hola',
  },
  {
    _id: 1,
    name: 'mundo',
    type: 'text',
    label: 'mundo',
  },
  {
    _id: 2,
    name: 'puerco',
    type: 'number',
    label: 'puerco',
  },
]

function AdminStationeries() {

  const { handleFieldChange } = useForm(holaForm)
  const formState = useFormStore<HolaForm>(state => state.formState);
  const errors = formValidator().getErrors(formState, holaSchema);
  const checkFormErrors = useFormStore(state => state.checkFormErrors);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    const hola = checkFormErrors(errors)
    if (hola) {
      console.log('Si hay errores');
    }else{
      console.log('No hay errores');
    }
  }

  return (
    <Layout title="papelería" >
      <Button
        buttonStyle="iconButton"
        ico="plus"
        top="26vh"
        position="fixed"
        right="3%"
        // onClick={botin}
      />
      <div>
      </div>
      <form action="POST" 
      onSubmit={handleSubmit}
      style={{width:'50rem', display:'flex', flexDirection:'column', gap:'2rem' }} >
      <FormControl
        formFields={options}
        className="form-control"
        classNameInput="form-control__input"
        classNameLabel="form-control__label"
        errors={errors}
        handleFieldChange={handleFieldChange}
      />
      <Button type="submit" >
        Enviar
      </Button>
      </form>
    </Layout>
  )
}

export default AdminStationeries;
import { FormControl } from "../client"

import { ErrorMessages, InitialForm } from "@/types"

interface Props {
  isCreate: boolean
  isEmployee: boolean
  errors: ErrorMessages<InitialForm | undefined>
  initialForm: Record<string, any>
}

const options = [
  {
    _id: 0,
    label: 'Nombre',
    type: 'text',
    name: 'name',
  },
  {
    _id: 1,
    label: 'Apellido',
    type: 'text',
    name: 'lastName',
  },
  {
    _id: 2,
    label: 'Email',
    type: 'email',
    name: 'email',
  },
  {
    _id: 3,
    label: 'Teléfono',
    type: 'text',
    name: 'phone',
  },
  {
    _id: 4,
    label: 'username',
    type: 'text',
    name: 'username',
  },
  {
    _id: 5,
    label: 'password',
    type: 'password',
    name: 'password',
  },
]

const optionsClient = [

  {
    _id: 6,
    label: 'repite Password',
    type: 'password',
    name: 'repitePassword',
  },
]

export const CreateEditPerson = ({
  errors,
  isCreate,
  isEmployee,
  initialForm
}: Props) => {

  let formFields = [];

  if (isEmployee) {
    formFields = isCreate ? options : options.filter(option => option.name !== 'password');
  } else {
    formFields = isCreate ? [...options, ...optionsClient] : optionsClient;
  }

  if (!isEmployee) {
    formFields = formFields.filter(option => option.name !== 'username');
  }

  return (
    <FormControl
      formFields={formFields}
      errors={errors}
      initialForm={initialForm}
      className="form-control"
      classNameInput="form-control__input"
      classNameLabel="form-control__label"
    />
  )
}

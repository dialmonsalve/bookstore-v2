import { FormEvent, useState } from 'react';

import { PrivateLayout } from '@/components/layouts';
import { useRegisterEmployee } from '@/hooks/auth';
import { useForm } from '@/hooks/useForm';

import { ApiMessageError, Button, ErrorMessage, FormControl, RegisterEmployOrClient, Select, selectOption } from '@/components/ui';

import { formValidator, newEmployeeValidationSchema } from '@/helpers';
import { TypeRole } from '@/types';

const newEmployee = {
  name: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  repitePassword: '',
  role: '',
}
const roles = [
  { label: 'logistica', value: 1 },
  { label: 'ventas', value: 2 },
  { label: 'compras', value: 3 },
]

function CreateEmployeePage() {

  const [option, setOption] = useState<selectOption[]>([roles[0]])
  const [messageErrolRole, setMessageErrolRole] = useState<string | null>(null)
  const [hasErrolRole, setHasErrolRole] = useState(false);
  const { registerEmployee, errorApiMessage, showError } = useRegisterEmployee();

  const {
    formState,
    isFormSubmitted,
    isTouched,
    hasErrors,
    handleBlur,
    handleFieldChange,
  } = useForm(newEmployee)

  const errors = formValidator().getErrors(formState, newEmployeeValidationSchema);

  const handleRegisterEmployee = (e: FormEvent) => {
    e.preventDefault();
    const notErrorsForms = hasErrors(errors);

    const newRoles = option.map(o => {
      return o.label
    })

    if (newRoles.length === 0) {
      setHasErrolRole(true);
      setMessageErrolRole('El usuario debe tener al menos 1 rol')
      // setTimeout(() => setHasErrolRole(false), 3000);
      return;
    }
    if (notErrorsForms) {
      registerEmployee.mutate({ ...formState, role: newRoles as TypeRole[] });
    }
  }

  return (
    <PrivateLayout title='Usuarios' >

      <ApiMessageError
        showError={hasErrolRole}
        errorApiMessage={messageErrolRole}
      />
      <ApiMessageError
        showError={showError}
        errorApiMessage={errorApiMessage}
      />
      <form 
      method='POST' 
      style={{ width: '60rem' }} 
      className='form' 
      onSubmit={handleRegisterEmployee}
      >
        <RegisterEmployOrClient
          formState={formState}
          isTouched={isTouched}
          isFormSubmitted={isFormSubmitted}
          errors={errors}
          handleBlur={handleBlur}
          handleFieldChange={handleFieldChange}
        />
        <div>
          <FormControl
            label='Username'
            name='username'
            type='text'
            placeholder='Username'
            value={formState?.username}
            onChange={handleFieldChange}
            onBlur={handleBlur}
          />
        </div>
        <Select
          options={roles || []}
          value={option}
          onChange={o => setOption(o)}
          name={'role'}
          multiple
        />
        <ErrorMessage
          fieldName={errors?.role}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched?.role}
        />

        <div style={{ display: 'flex' }}>
          <Button
            type='submit'
            backgroundColor='green'
            disabled={!!errors}
          >
            Crear Cuenta
          </Button>

        </div>
      </form>
    </PrivateLayout>
  )
}

export default CreateEmployeePage
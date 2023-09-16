import { FormEvent, useState } from 'react';

import { useForm } from '@/hooks/useForm';

import { useRegisterEmployee } from '@/hooks/employee';

import { Layout } from '@/components/layouts/app';
import { AlertSuccess, ApiMessageError, Button, ErrorMessage, FormControl, Select } from '@/components/ui/client';
import { RegisterEmployOrClient } from '@/components/ui/services';

import { ROLES, formValidator, newEmployeeValidationSchema } from '@/helpers';
import { IEmployee, TypeRole } from '@/types';
import { useUisStore } from '@/store/ui';

const newEmployee = {
  name: '',
  lastName: '',
  username: '',
  email: '',
  phone: '',
  password: '',
  repitePassword: '',
  role: ''
}
function CreateEmployeePage() {

  const [option, setOption] = useState<TypeRole[]>([ROLES[0]] as TypeRole[]);
  const setErrorApiMessage = useUisStore(state => state.setErrorMessage);
  const registerEmployee = useRegisterEmployee();

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

    const newRoles = option.map(opt => {
      return opt
    })

    if (newRoles.length === 0) {
      setErrorApiMessage(true, 'El usuario debe tener al menos 1 rol');
      setTimeout(() => setErrorApiMessage(false), 3000);
      return;
    }
    if (notErrorsForms) {
      const { repitePassword, ...rest } = formState
      const newEmployee = { ...rest, role: newRoles }
      registerEmployee.mutate(newEmployee as IEmployee);
    }
  }

  return (
    <Layout title='Usuarios' >
      <ApiMessageError />
      <AlertSuccess />

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
          options={ROLES || []}
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
            disabled={!!errors || registerEmployee.isLoading}
          >
            {`${registerEmployee.isLoading ? 'Espere' : 'Crear Cuenta'} `}
          </Button>

        </div>
      </form>
    </Layout>
  )
}

export default CreateEmployeePage
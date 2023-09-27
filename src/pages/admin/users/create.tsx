import { FormEvent, useState } from 'react';

import { useForm } from '@/hooks/useForm';
import { useRegisterEmployee } from '@/hooks/employee';
import { useUisStore } from '@/store/ui';
import { useFormStore } from '@/store/form';

import { Layout } from '@/components/layouts/app';
import { AlertSuccess, ApiMessageError, Button,  Select, Spinner, } from '@/components/ui/client';
import { CreateEditPerson } from '@/components/ui/services';

import {  formValidator } from '@/helpers';
import { USER_VALIDATION_SCHEMA } from "@/constants";
import { IEmployee, TypeRole } from '@/types';

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

  const [option, setOption] = useState<TypeRole[]>([USER_VALIDATION_SCHEMA.ROLES[0]] as TypeRole[]);

  const setErrorApiMessage = useUisStore(state => state.setErrorMessage);
  const registerEmployee = useRegisterEmployee();

  const { handleFieldChange } = useForm(newEmployee)
  const formState = useFormStore(state => state.formState)
  const checkFormErrors = useFormStore(state => state.checkFormErrors)

  const errors = formValidator().getErrors(formState, USER_VALIDATION_SCHEMA.newEmployee);

  const handleRegisterEmployee = (e: FormEvent) => {
    e.preventDefault();
    const hasErrors = checkFormErrors(errors);

    const newRoles = option.map(opt => {
      return opt
    })

    if (newRoles.length === 0) {
      setErrorApiMessage(true, 'El usuario debe tener al menos 1 rol');
      setTimeout(() => setErrorApiMessage(false), 3000);
      return;
    }
    if (!hasErrors) {
      const { repitePassword, ...rest } = formState
      const newEmployee = { ...rest, role: newRoles }
      registerEmployee.mutate(newEmployee as IEmployee);
    }
  }

  return (
    <Layout title='Usuarios' >
      <ApiMessageError />
      <AlertSuccess />
      {registerEmployee.isLoading && <Spinner />}

      <form
        method='POST'
        style={{ width: '60rem' }}
        className='form'
        onSubmit={handleRegisterEmployee}
      >
        <CreateEditPerson
          initialForm={newEmployee}
          errors={errors}
          isCreate
          isEmployee
        />
        <Select
          options={USER_VALIDATION_SCHEMA.ROLES || []}
          value={option}
          onChange={o => setOption(o)}
          name={'role'}
          multiple
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
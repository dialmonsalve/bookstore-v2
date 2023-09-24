import { FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { useLogin } from '@/hooks/auth';
import { useForm } from '@/hooks/useForm';
import { useFormStore } from '@/store/form';

import { ApiMessageError, Button, FormControl } from '@/components/ui/client';

import { formValidator } from '@/helpers';
import { LOGIN_VALIDATION_SCHEMA } from '@/constants';

const login = {
  username: '',
  password: '',
}
const options = [
  {
    _id: 0,
    name: 'username',
    type: 'text',
    label: 'username',
  },
  {
    _id: 1,
    name: 'password',
    type: 'password',
    label: 'password',
  },
]

function PrivateLoginPage() {

  const  loginUser  = useLogin("username");

  const { handleFieldChange } = useForm(login);
  const formState = useFormStore(state => state.formState);
  const handleResetForm = useFormStore(state => state.handleResetForm);
  const checkFormErrors = useFormStore(state => state.checkFormErrors);

  const errors = formValidator().getErrors(formState, LOGIN_VALIDATION_SCHEMA.employee);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const hasErrors = checkFormErrors(errors);

    if (!hasErrors) {
      handleResetForm()
      loginUser.mutate({ username: formState?.username, password: formState?.password });
    }
  }
  return (

    <main className='admin-login' >

      <h1 style={{ color: 'white' }} >Login</h1>
      <ApiMessageError />
      <form className="form" onSubmit={handleSubmit} noValidate >

        <FormControl 
          handleFieldChange={handleFieldChange}
          errors={errors}
          formFields={options}
          className="form-control"
          classNameInput="form-control__input"
          classNameLabel="form-control__label"
        />
        <div className="form__buttons">
          <Button type="submit" width='40%' backgroundColor="blue" disabled={!!errors}  >
            Login
          </Button>
        </div>
      </form>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req });

  const { p = '/bookstore' } = query;

  if (session) {
    return {
      redirect: {
        destination: p.toString(),
        permanent: false
      }
    }
  }
  return {
    props: {

    }
  }
}

export default PrivateLoginPage
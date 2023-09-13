import { FormEvent } from 'react';
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { useLogin } from '@/hooks/auth';
import { useForm } from '@/hooks/useForm';

import { ApiMessageError, Button, LoginAuthentication } from '@/components/ui'
import { formValidator, loginEmployeeValidationSchema } from '@/helpers';

const login = {
  username: '',
  password: '',
  email: ''
}

function PrivateLoginPage() {

  const { loginUser, showError, errorApiMessage } = useLogin("username")

  const { formState, hasErrors, handleResetForm, isTouched, isFormSubmitted, handleBlur, handleFieldChange } = useForm(login)

  const errors = formValidator().getErrors(formState, loginEmployeeValidationSchema);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const notErrorsForms = hasErrors(errors);

    if (notErrorsForms) {
      handleResetForm()
      loginUser.mutate({ username: formState?.username, password: formState?.password });
    }
  }
  return (

    <main className='admin-login' >

      <h1 style={{ color: 'white' }} >Login</h1>
      <ApiMessageError
        showError={showError}
        errorApiMessage={errorApiMessage}
      />
      <form className="form" onSubmit={handleSubmit} noValidate >
        <LoginAuthentication
          isEmployee
          errors={errors}
          formState={formState}
          isFormSubmitted={isFormSubmitted}
          isTouched={isTouched}
          handleBlur={handleBlur}
          handleFieldChange={handleFieldChange}
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
import React, { FormEvent } from 'react'
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { useForm } from '@/hooks';

import { ApiMessageError, LoginForm } from '@/components/ui'

import { formValidator, loginEmployee, loginEmployeeValidationSchema } from '@/helpers';
import { useLogin } from '@/hooks/auth';

function PrivateLoginPage() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleFieldChange,
    handleBlur,
    areFieldsValid,
    handleResetForm
  } = useForm(loginEmployee);

  const { username, password } = formState;

  const errors = formValidator().getErrors(formState, loginEmployeeValidationSchema);

  const { loginUser, setShowError,  errorApiMessage, showError } = useLogin("username")

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setShowError(false);

    if (areFieldsValid(errors)) {
      handleResetForm()

      loginUser.mutate({ username, password });
    }
  }
  return (
    <main className='admin-login' >
      <h1 style={{ color: 'white' }} >Login</h1>
      <ApiMessageError
        showError={showError}
        errorApiMessage={errorApiMessage}
      />
      <LoginForm
        formState={formState}
        errors={errors}
        isFormSubmitted={isFormSubmitted}
        isTouched={isTouched}
        onSubmit={handleSubmit}
        handleFieldChange={handleFieldChange}
        handleBlur={handleBlur}
        isEmployee
      />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req });

  const { p = '/bookstore' } = query;

  if (session) {
    return {
      redirect: {
        destination:  p.toString(),
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
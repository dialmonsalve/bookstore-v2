import React, { FormEvent } from 'react'
import { GetServerSideProps } from 'next';
import { getSession } from "next-auth/react";

import { useForm } from '@/hooks';

import { ApiMessageError, LoginForm } from '@/components/ui'

import { formValidator, loginStaffValidationSchema } from '@/helpers';
import { useLoginOrRegistry } from '@/hooks/auth';

export const loginStaff = {
  username: '',
  password: '',
}

function PrivateLoginPage() {

  const {
    formState,
    isFormSubmitted,
    isTouched,
    handleFieldChange,
    handleBlur,
    areFieldsValid,
    handleResetForm
  } = useForm(loginStaff);

  const { username, password } = formState;

  const errors = formValidator().getErrors(formState, loginStaffValidationSchema);

  const { loginUser, setShowError,  errorApiMessage, showError } = useLoginOrRegistry("username")

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
        isStaff
      />
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {

  const session = await getSession({ req });

  const { p = '/admin/bookstore' } = query;

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